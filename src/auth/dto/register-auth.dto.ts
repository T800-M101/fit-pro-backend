import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {

      @IsString()
      name:string;
    
      @IsEmail()
      email: string;
      
      @IsString()
      phone: string;
    
      @MinLength(6)
      @MaxLength(12)
      password: string;
    
      @IsString()
      gender: string;
      
      @IsString()
      membership: string;
      
      @IsBoolean()
      membershipStatus: boolean;
      
      @IsOptional()
      @IsString()
      role: string = 'user';
      
      @IsOptional()
      @IsBoolean()
      wantsEmail?: boolean;

      @IsOptional()
      @IsBoolean()
      wantsWhatsApp?: boolean;
}
