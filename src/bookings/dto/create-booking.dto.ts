import { 
  IsInt, 
  IsDateString,
} from 'class-validator';


export class CreateBookingDto {
 
  @IsInt()
  userId: number;

  @IsInt()
  classSessionId: number;

  @IsDateString()
  bookingTime: string;
}


 