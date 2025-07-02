import {  Injectable,  } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { ClassSession } from 'src/cron/class-sessions/class-session.entity';

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


async bookClass(dto: CreateBookingDto): Promise<any> {
  
}
}



  