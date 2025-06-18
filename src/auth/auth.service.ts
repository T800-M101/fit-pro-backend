import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { randomUUID } from 'crypto';
import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';
import { EmailService } from 'src/email/email.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
   @InjectRepository(PasswordResetToken) // ✅ ADD THIS
  private passwordResetRepository: Repository<PasswordResetToken>,
    private readonly emailService: EmailService,
  ) {}

async register(userAuthDto: RegisterAuthDto) {
  const { password, ...userData } = userAuthDto;

  // Check if email already exists
  const existingUser = await this.usersRepository.findOne({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new HttpException('Email already in use', HttpStatus.CONFLICT);
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  const newUser = this.usersRepository.create({
    ...userData,
    password: hashedPassword,
  });

  const savedUser = await this.usersRepository.save(newUser);

 
  const payload = { sub: savedUser.id, name: savedUser.fullName, role: savedUser.role };
  const token = await this.jwtService.signAsync(payload);

  return { token }; 
}


  async login(userLogin: LoginAuthDto) {
    const { email, password } = userLogin;
    const userFound = await this.usersRepository.findOne({ where: { email } });

    if (!userFound) {
      throw new HttpException('User not found', 404);
    }

    const checkPassword = await compare(password, userFound.password);

    if (!checkPassword) {
      return new HttpException('wrong credentials', 403);
    }

    const payload = { id: userFound.id, email: userFound.email, name: userFound.fullName, role: userFound.role };
    const token = this.jwtService.sign(payload);

    return {
      user: plainToInstance(UserResponseDto, userFound,  {excludeExtraneousValues: true}),
      token
    };
  }

async sendPasswordResetLink(email: string): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = randomUUID();

    await this.passwordResetRepository.save({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes expiration
    });

    const resetLink = `http://localhost:4200/pass-recovery?token=${token}`;

    await this.emailService.send({
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return { message: 'Reset link sent' };
  }


  async resetPassword(dto: ResetPasswordDTO): Promise<{ message: string }> {
   
    const record = await this.passwordResetRepository.findOne({ where: { token: dto.token } });

    if (!record) throw new BadRequestException('Invalid or expired token');
    if (record.expiresAt < new Date()) throw new BadRequestException('Token expired');

    const user = await this.usersRepository.findOne({ where: { id: record.userId } });
    if (!user) throw new NotFoundException('User not found');

    user.password = await hash(dto.newPassword, 10);
    await this.usersRepository.save(user);

    // Opcional: borrar token para no poder reutilizarlo
    await this.passwordResetRepository.delete({ token: dto.token });

    return { message: 'Password reset successfully' };
  }
}







 

