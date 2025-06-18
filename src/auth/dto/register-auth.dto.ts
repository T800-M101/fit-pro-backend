import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {

      @IsString()
      fullName:string;
     
      @IsString()
      username:string;
    
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
      membershipType: string;
}
