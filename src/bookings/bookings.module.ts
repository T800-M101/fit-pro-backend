import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/classes/entities/class.entity';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { ClassSession } from 'src/cron/class-sessions/class-session.entity';

@Module({
  
      imports: [
    TypeOrmModule.forFeature([
      ClassSession,
      Class,
      Booking,
      User, 
    ]), 
    ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
