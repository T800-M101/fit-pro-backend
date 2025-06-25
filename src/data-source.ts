
import { DataSource } from 'typeorm';

import { Class } from './classes/entities/class.entity';
import { User } from './users/entities/user.entity';
import { Payment } from './payments/entities/payment.entity';
import { Booking } from './bookings/entities/booking.entity';


import { ClassSession } from './class_session/entities/class_session.entity';
import { Comment } from './comments/entities/comment.entity';
import { PasswordResetToken } from './password-reset-token/entities/password-reset-token.entity';
import { Instructor } from './instructors/entities/instructor.entity';
import { MembershipPlan } from './membership-plans/entities/membership-plan.entity';
import { Role } from './roles/entities/role.entity';
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
    User, Booking, ClassSession, Class, Comment, Payment, PasswordResetToken, Class, Instructor, MembershipPlan, Role
  ], 
});
