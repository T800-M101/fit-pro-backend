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
    private readonly templateRepo: Repository<ScheduleTemplate>
  ) {}


  async testGenerateSessionsNow() {
  await this.generateWeeklySessions();
}




@Cron(CronExpression.EVERY_WEEK)
async generateWeeklySessions() {
  this.logger.log('Generating class sessions...');

  const now = new Date();

  // 1. 🔁 Deactivate old sessions
  const oldSessions = await this.classSessionRepo.find({
    where: {
      isActive: true,
    },
  });

  for (const session of oldSessions) {
    const sessionDate = session.date instanceof Date ? session.date : new Date(session.date);
    const sessionDateTime = new Date(`${sessionDate.toISOString().split('T')[0]}T${session.startTime}`);

    if (sessionDateTime < now) {
      session.isActive = false;
    }
  }

  await this.classSessionRepo.save(oldSessions);
  this.logger.log(`Updated ${oldSessions.length} old sessions to inactive.`);

  // 2. 📦 Get all classes with templates
  const classes = await this.classRepo.find({
    relations: ['scheduleTemplates', 'instructor'],
  });

  const sessionsToCreate: ClassSession[] = [];

  for (const cls of classes) {
    // Group templates by weekday
    const templatesByDay = cls.scheduleTemplates.reduce((acc, template) => {
      if (!acc[template.dayOfWeek]) acc[template.dayOfWeek] = [];
      acc[template.dayOfWeek].push(template);
      return acc;
    }, {} as Record<number, ScheduleTemplate[]>);

    // 3. 🗓️ Create sessions for next week (Monday to Saturday)
    for (let day = 1; day <= 6; day++) {
      const templatesForDay = templatesByDay[day] || [];
      if (templatesForDay.length === 0) continue;

      const date = this.getNextWeekdayDate(day); // Returns correct date for next weekday

      for (const template of templatesForDay) {
        const startTime = template.startTime;

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
            totalSpots: template.totalSpots ?? 10,
            availableSpots: template.totalSpots ?? 10,
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

async getSessionsByClassId(classId: number) {
  const sessions = await this.classSessionRepo.find({
    where: {
      class: { id: classId },
      isActive: true, // only active sessions
    },
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

  // Initialize structure to hold sessions grouped by day and date
  const sessionsByDay: Record<string, { sessionDate: string; timeSlots: string[] }[]> = {};
  const spotsByDay: Record<string, { totalSpots: number; availableSpots: number }> = {};

  for (const day of daysOfWeek) {
    sessionsByDay[day] = [];
    spotsByDay[day] = { totalSpots: 0, availableSpots: 0 };
  }

  for (const session of sessions) {
    const dateObj = session.date instanceof Date ? session.date : new Date(session.date);
    const dayIndex = dateObj.getDay(); // Sunday=0, Monday=1...Saturday=6
    if (dayIndex === 0) continue; // Skip Sundays

    const dayName = daysOfWeek[dayIndex - 1];
    const sessionDate = dateObj.toISOString().split('T')[0];
    const time = session.startTime.slice(0, 5); // "HH:MM"

    // Update spots per day (aggregate)
    spotsByDay[dayName].totalSpots += session.totalSpots;
    spotsByDay[dayName].availableSpots += session.availableSpots;

    // Find existing sessionDate group inside that day
    let daySessions = sessionsByDay[dayName];
    let sessionGroup = daySessions.find(s => s.sessionDate === sessionDate);
    if (!sessionGroup) {
      sessionGroup = { sessionDate, timeSlots: [] };
      daySessions.push(sessionGroup);
    }

    // Add the time slot if not already present (avoid duplicates)
    if (!sessionGroup.timeSlots.includes(time)) {
      sessionGroup.timeSlots.push(time);
    }
  }

  // Final output
  return daysOfWeek.map(day => ({
    classId,
    day,
    totalSpots: spotsByDay[day].totalSpots,
    availableSpots: spotsByDay[day].availableSpots,
    sessions: sessionsByDay[day],
  }));
}


}
