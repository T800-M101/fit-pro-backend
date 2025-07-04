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

  async saveBookings(
    bookingsList: CreateBookingDto[],
    userId: number,
  ): Promise<void> {
    const now = new Date();
    const newBookings: Booking[] = [];

    // 1. Find the user once (outside the loop)
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    for (const entry of bookingsList) {
      try {
        const { classId, date, time } = entry;

        // 2. Parse and validate date
        const parsedDate = new Date(date); // Force UTC

        // 3. Find class session
        const classSession = await this.classSessionRepository.findOne({
          where: {
            class: { id: classId },
            date: parsedDate,
            startTime: time,
          },
        });
        if (!classSession) {
          console.warn(
            `Session not found (Class: ${classId}, Date: ${parsedDate}, Time: ${time})`,
          );
          continue;
        }

        // 4. Create booking
        newBookings.push(
          this.bookingRepository.create({
            user,
            classSession,
            bookingDate: parsedDate,
            bookingTime: time,
            attended: false,
            cancelled: false,
            cancellationTime: null,
          }),
        );
      } catch (error) {
        console.error(`Error processing booking:`, error);
      }
    }

    // 5. Save ALL bookings in a single transaction
    if (newBookings.length > 0) {
      try {
        await this.bookingRepository.save(newBookings);
        console.log(`Successfully saved ${newBookings.length} bookings`);
      } catch (error) {
        console.error('Failed to save bookings:', error);
        throw error; // Re-throw to handle upstream
      }
    }
  }
}
