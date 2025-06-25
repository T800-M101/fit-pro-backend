import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSession } from 'src/class_session/entities/class_session.entity';
import { Class } from 'src/classes/entities/class.entity';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';

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
