import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/classes/entities/class.entity';
import { ScheduleTemplate } from 'src/schedule-template/entities/schedule-template.entity';
import { Repository } from 'typeorm';
import { ClassSession } from './class-session.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Injectable()
export class ClassSessionsService {
  private readonly logger = new Logger(ClassSessionsService.name);

  constructor(
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,

    @InjectRepository(ClassSession)
    private readonly classSessionRepo: Repository<ClassSession>,

    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(ClassSession)
    private readonly templateRepo: Repository<ScheduleTemplate>,
  ) {}

  async testGenerateSessionsNow() {
    await this.generateWeeklySessions();
  }

  @Cron(CronExpression.EVERY_WEEK)
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
      const sessionDate = new Date(session.date); // `session.date` is a Date or string in 'YYYY-MM-DD'

      // session.startTime is now a string like '06:00'
      const [hours, minutes] = session.startTime.split(':').map(Number);

      // Combine into a full datetime object
      const sessionDateTime = new Date(sessionDate);
      sessionDateTime.setHours(hours, minutes, 0, 0);

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

        const date = this.getNextWeekdayDate(day);

        for (const template of templatesForDay) {
          const [hours, minutes] = template.startTime.split(':').map(Number);

          // Format startTime as "HH:MM" string
          const startTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

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
              isActive: true,
            });

            sessionsToCreate.push(session);
          }
        }

        if (sessionsToCreate.length > 0) {
          await this.classSessionRepo.save(sessionsToCreate);
          this.logger.log(`${sessionsToCreate.length} new sessions created.`);
        } else {
          this.logger.log('No new sessions were created.');
        }
      }
    }
  }

  
private getNextWeekdayDate(targetDay: number): Date {
  const today = new Date();
  const todayDay = today.getDay(); // Sunday=0, Monday=1, ..., Saturday=6

  // Calculate days until next target day (always in the next week)
  let daysUntilNextTarget = (targetDay - todayDay + 7) % 7;
  // If it's the same day (Sunday), we want exactly 7 days later
  if (daysUntilNextTarget === 0) {
    daysUntilNextTarget = 7;
  }

  const result = new Date(today);
  result.setDate(today.getDate() + daysUntilNextTarget);
  result.setHours(0, 0, 0, 0);
  return result;
}

  
  async getSessionsByClassId(classId: number) {
  const sessions = await this.classSessionRepo.find({
    where: {
      class: { id: classId },
      isActive: true,
    },
    order: {
      date: 'ASC',
      startTime: 'ASC',
    },
  });

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  type SessionTimeSlot = {
    time: string;
    totalSpots: number;
    availableSpots: number;
  };

  type DailySession = {
    classId: number;
    day: string;
    date: string;
    sessions: SessionTimeSlot[];
  };

  const resultMap = new Map<string, DailySession>();

  for (const session of sessions) {
    const dateObj = new Date(session.date);
    const dayIndex = dateObj.getDay();
    console.log('sessio date', session.date, ' =>','dayIdex',dayIndex)

    const dateStr = dateObj.toISOString().split('T')[0];
    const dayName = daysOfWeek[dayIndex];
    const time = session.startTime.substring(0, 5);
    const timeFull = `${time}:00`;

    const key = dateStr;

    if (!resultMap.has(key)) {
      resultMap.set(key, {
        classId,
        day: dayName,
        date: dateStr,
        sessions: [],
      });
    }

    // 🔥 Count bookings for this time slot
    const bookingsCount = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.classSession', 'classSession')
      .where(`DATE(booking.bookingDate) = :date`, { date: dateStr })
      .andWhere(`booking.bookingTime = :time`, { time: timeFull })
      .andWhere('classSession.class = :classId', { classId })
      .getCount();

    resultMap.get(key)!.sessions.push({
      time,
      totalSpots: session.totalSpots,
      availableSpots: session.totalSpots - bookingsCount,
    });
  }

  // Convert map to sorted array
  return [...resultMap.values()].sort((a, b) => a.date.localeCompare(b.date));
}

}
