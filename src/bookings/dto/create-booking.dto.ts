import { 
  IsInt, 
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';


export class CreateBookingDto {
 
   @IsInt()
  classId: number;

  @IsDateString()
  date: string; // ISO 8601 format e.g., "2025-07-08"

  @IsString()
  time: string; // e.g., "06:00"
}


 