import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Class } from './classes/entities/class.entity';
import { User } from './users/entities/user.entity';
import { Payment } from './payments/entities/payment.entity';
import { NoShow } from './no-shows/entities/no-show.entity';
import { Booking } from './bookings/entities/booking.entity';
import { Instructor } from './instructors/entities/instructor.entity';
import { ClassSession } from './classes/entities/class-session.entity';
import { MembershipPlan } from './membership-plans/entities/membership-plan.entity';
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
  entities: [User, Payment, NoShow, Instructor, Class, ClassSession, Booking, MembershipPlan], // add all your entities
});
