import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  bookClass(@Body() createBookingDto: CreateBookingDto[], @Req() req) {
    console.log(createBookingDto)
    const userId = req.user?.id;
    return this.bookingsService.saveBookings(createBookingDto, userId);
  }

 
}
