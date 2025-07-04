import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/classes/entities/class.entity';
import { ScheduleTemplate } from 'src/schedule-template/entities/schedule-template.entity';
import { Repository } from 'typeorm';
import { ClassSession } from './class-session.entity';

@Injectable()
export class ClassSessionsService {
  private readonly logger = new Logger(ClassSessionsService.name);

  constructor(
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,

    @InjectRepository(ClassSession)
    private readonly classSessionRepo: Repository<ClassSession>,

    @InjectRepository(ClassSession)
    private readonly templateRepo: Repository<ScheduleTemplate>,
  ) {}

  async testGenerateSessionsNow() {
    await this.generateWeeklySessions();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async generateWeeklySessions() {
    this.logger.log('Generating class sessions...');

    const now = new Date();

    // 1. Deactivate old sessions
    const oldSessions = await this.classSessionRepo.find({
      where: {
        isActive: true,
      },
    });

    for (const session of oldSessions) {
      const sessionDate =
        session.date instanceof Date ? session.date : new Date(session.date);
      const sessionDateTime = new Date(
        `${sessionDate.toISOString().split('T')[0]}T${session.startTime}`,
      );

      if (sessionDateTime < now) {
        session.isActive = false;
      }
    }

    await this.classSessionRepo.save(oldSessions);
    this.logger.log(`Updated ${oldSessions.length} old sessions to inactive.`);

    // 2. Get all classes with templates
    const classes = await this.classRepo.find({
      relations: ['scheduleTemplates', 'instructor'],
    });

    const sessionsToCreate: ClassSession[] = [];

    for (const cls of classes) {
      // Group templates by weekday (if they exist)
      const templatesByDay =
        cls.scheduleTemplates?.reduce(
          (acc, template) => {
            if (!acc[template.dayOfWeek]) acc[template.dayOfWeek] = [];
            acc[template.dayOfWeek].push(template);
            return acc;
          },
          {} as Record<number, ScheduleTemplate[]>,
        ) || {};

      // 3. Create sessions for next week (Monday to Saturday)
      for (let day = 1; day <= 6; day++) {
        const templatesForDay = templatesByDay[day] || [];
        if (templatesForDay.length === 0) continue;

        const date = this.getThisWeekdayDate(day);

        for (const template of templatesForDay) {
          const startTime = template.startTime;

          // Use template.totalSpots if available, otherwise fall back to cls.defaultSpots or 10
          const fallbackSpots = template.totalSpots ?? cls.defaultSpots ?? 10;

          const exists = await this.classSessionRepo.findOne({
            where: {
              class: { id: cls.id },
              date,
              startTime,
            },
          });

          if (!exists) {
            const session = this.classSessionRepo.create({
              class: cls,
              date,
              startTime,
              totalSpots: fallbackSpots,
              availableSpots: fallbackSpots,
              isActive: true,
            });
            sessionsToCreate.push(session);
          }
        }
      }
    }

    if (sessionsToCreate.length > 0) {
      await this.classSessionRepo.save(sessionsToCreate);
      this.logger.log(`${sessionsToCreate.length} new sessions created.`);
    } else {
      this.logger.log('No new sessions were created.');
    }
  }

  private getNextWeekdayDate(targetDay: number): Date {
    const today = new Date();
    const todayDay = today.getDay(); // 0 (Sun) to 6 (Sat)
    const daysUntilTarget = (targetDay + 7 - todayDay) % 7 || 7;

    const result = new Date(today);
    result.setDate(today.getDate() + daysUntilTarget);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  private getThisWeekdayDate(targetDay: number): Date {
    const today = new Date();
    const todayDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const diff = targetDay - todayDay;

    const result = new Date(today);
    result.setDate(
      today.getDate() + (diff >= 0 ? diff : -(7 - Math.abs(diff))),
    );
    result.setHours(0, 0, 0, 0);
    return result;
  }

  async getSessionsByClassId(classId: number) {
    const sessions = await this.classSessionRepo.find({
      where: {
        class: { id: classId },
        isActive: true,
      },
      relations: ['bookings'],
      order: { date: 'ASC', startTime: 'ASC' },
    });

    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const result: {
      classId: number;
      day: string;
      date: string;
      availableSpots: number;
      totalSpots: number;
      timeSlots: { time: string }[];
    }[] = [];

    const accumulator: Record<
      string,
      {
        timeSlots: Set<string>;
        date: string;
        totalSpotsPerSlot: number;
        totalBookings: number;
      }
    > = {};

    for (const session of sessions) {
      const dateObj =
        session.date instanceof Date ? session.date : new Date(session.date);
      const dayIndex = dateObj.getDay(); // 0 = Sunday ... 6 = Saturday
      if (dayIndex === 0) continue; // Skip Sundays

      const dayName = daysOfWeek[dayIndex - 1];
      const dateStr = dateObj.toISOString().split('T')[0];
      const time = session.startTime.slice(0, 5); // "HH:MM"
      const bookingsCount = session.bookings?.length || 0;

      if (!accumulator[dayName]) {
        accumulator[dayName] = {
          date: dateStr,
          timeSlots: new Set<string>(),
          totalSpotsPerSlot: session.totalSpots,
          totalBookings: 0,
        };
      }

      accumulator[dayName].timeSlots.add(time);
      accumulator[dayName].totalBookings += bookingsCount;
    }

    for (const day of daysOfWeek) {
      const data = accumulator[day];
      if (data && data.timeSlots.size > 0) {
        const totalSpots = data.totalSpotsPerSlot;
        const totalTimeSlots = data.timeSlots.size;
        const totalCapacity = totalSpots * totalTimeSlots;
        const availableSpots = totalCapacity - data.totalBookings;

        result.push({
          classId,
          day,
          date: data.date,
          totalSpots,
          availableSpots,
          timeSlots: Array.from(data.timeSlots)
            .sort()
            .map((time) => ({
              time,
            })),
        });
      }
    }

    return result;
  }
}
