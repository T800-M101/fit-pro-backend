import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { ClassSession } from 'src/cron/class-sessions/class-session.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(ClassSession)
    private readonly classSessionRepository: Repository<ClassSession>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


async saveBookings(bookingsList: CreateBookingDto[], userId: number): Promise<void> {
  const newBookings: Booking[] = [];

  const user = await this.userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  for (const entry of bookingsList) {
    try {
      const { classId, date: dateString, time: timeString } = entry;

      // Parse date string to JS Date (midnight)
      const [year, month, day] = dateString.split('-').map(Number);
      const bookingDate = new Date(year, month - 1, day);
      bookingDate.setHours(0, 0, 0, 0); // Ensures no time component

      // timeString is already in "HH:MM" format
      const classSession = await this.classSessionRepository.findOne({
        where: {
          class: { id: classId },
          date: bookingDate,    
          startTime: timeString, 
        },
      });

      if (!classSession) {
        console.warn(
          `Session not found (Class: ${classId}, Date: ${bookingDate.toISOString().split('T')[0]}, Time: ${timeString})`
        );
        continue;
      }

      // Create the booking
      newBookings.push(
        this.bookingRepository.create({
          user,
          classSession,
          bookingDate,         
          bookingTime: timeString, 
          attended: false,
          cancelled: false,
          cancellationTime: null,
        }),
      );
    } catch (error) {
      console.error(`Error processing booking for classId ${entry.classId}:`, error);
    }
  }

  if (newBookings.length > 0) {
    await this.bookingRepository.save(newBookings);
    console.log(`Successfully created ${newBookings.length} bookings.`);
  } else {
    console.log(' No bookings were created.');
  }
}


}
