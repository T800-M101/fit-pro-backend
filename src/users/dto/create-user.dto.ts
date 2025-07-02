import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LoginAuthDto } from "src/auth/dto/login-auth.dto";

export class CreateUserDto extends PartialType(LoginAuthDto) {
  
    
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  membershipId: string;

  @IsBoolean()
  membershipStatus: boolean = false;
  
  @IsOptional()
  @IsInt()
  roleId?: number;
  
  @IsOptional()
  @IsBoolean()
  allowEmail: boolean = true;
  
  @IsOptional()
  @IsBoolean()
  allowWhatsApp?: boolean = true;

  @IsString()
  @IsOptional()
  qrCode: string;
}


      
      
      


