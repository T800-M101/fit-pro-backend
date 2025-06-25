import { 
  IsInt, 
  IsNotEmpty, 
  IsPositive,
  IsDateString,
  IsOptional 
} from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';

export class CreateBookingDto {
 
 classSessionId: number;
  userId: number;
  bookedAt: string;
  attended: boolean;;
}
