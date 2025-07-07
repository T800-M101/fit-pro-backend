
import { DataSource } from 'typeorm';

import { Class } from './classes/entities/class.entity';
import { User } from './users/entities/user.entity';
import { Payment } from './payments/entities/payment.entity';
import { Booking } from './bookings/entities/booking.entity';


import { Comment } from './comments/entities/comment.entity';
import { PasswordResetToken } from './password-reset-token/entities/password-reset-token.entity';
import { Instructor } from './instructors/entities/instructor.entity';
import { MembershipPlan } from './membership-plans/entities/membership-plan.entity';
import { Roles } from './roles/entities/role.entity';
import { ScheduleTemplate } from './schedule-template/entities/schedule-template.entity';
import { ClassSession } from './cron/class-sessions/class-session.entity';
import { Duration } from './duration/entities/duration.entity';
// Add other entities here

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'secret123',
  database: 'fitproDB',
  synchronize: true,
  logging: true,
  entities: [
    User, Booking, ClassSession, Class, Comment, Payment, PasswordResetToken, Class, Instructor, MembershipPlan, Roles, ScheduleTemplate, Duration
  ], 
});
