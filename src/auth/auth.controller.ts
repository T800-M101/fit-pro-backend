import { Controller, Post, Body, Put, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { Request } from 'express';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
interface AuthenticatedRequest extends Request {
  user: { id: number }; // Add more fields if needed
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() userLogin: LoginAuthDto) {
    return this.authService.login(userLogin);
  }

  @Post('request-password-reset')
  async requestPasswordReset(
    @Body() resetPasswordDto: RequestPasswordResetDto,
  ) {
    return this.authService.sendPasswordResetLink(resetPasswordDto.email);
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDto);
  }

@Post('refresh-token')
@UseGuards(AuthGuard('jwt'))
refreshToken(@Req() req: any) {
  const user = req.user;
  console.log('USER:', user); 

   const userId = user?.sub;
   console.log('id', userId)
  if (!userId) throw new UnauthorizedException('User ID missing from token');

   return this.authService.refreshToken(userId);
}





  // @UseGuards(JwtAuthGuard)
  // @Put('change-password')
  // async changePassword(
  //   @Req() req: AuthenticatedRequest,
  //   @Body() changePasswordDto: ChangePasswordDTO
  // ) {
  //   const userId = req.user.id;
  //   return this.authService.changePassword(userId, changePasswordDto);
  // }
}
