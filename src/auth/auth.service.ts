import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { randomUUID } from 'crypto';
import { PasswordResetToken } from '../password-reset-token/entities/password-reset-token.entity';
import { EmailService } from 'src/email/email.service';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Roles } from '../roles/entities/role.entity';
import { MembershipPlan } from 'src/membership-plans/entities/membership-plan.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private passwordResetRepository: Repository<PasswordResetToken>,
    @InjectRepository(Roles) private rolRepository: Repository<Roles>,
    @InjectRepository(MembershipPlan)
    private membershipPlanRepository: Repository<MembershipPlan>,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      // Check if email already exists
      const existingUser = await this.usersRepository.findOneBy({
        email: userData.email?.toLowerCase(),
      });
      if (existingUser) {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }

      // Find the role
      const defaultRole = await this.rolRepository.findOneBy({ name: 'user' });
      if (!defaultRole) {
        throw new HttpException(
          'Default role not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const membershipPlan = await this.membershipPlanRepository.findOneBy({
        id: Number(userData.membershipId),
      });
      if (!membershipPlan) {
        throw new HttpException(
          'Membership plan not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await hash(password, 10);

      const newUser = this.usersRepository.create({
        ...userData,
        name: userData.name.toLowerCase(),
        email: userData.email?.toLowerCase(),
        gender: userData.gender.toLowerCase(),
        password: hashedPassword,
        role: defaultRole,
        membershipPlan,
      });

      const savedUser = await this.usersRepository.save(newUser);

      const fullUser = await this.usersRepository.findOne({
        where: { id: savedUser.id },
        relations: ['membershipPlan'],
      });

      if (!fullUser?.membershipPlan) {
        throw new HttpException(
          'Membership data missing',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const payload = {
        sub: savedUser.id,
        name: savedUser.name,
        role: savedUser.role?.name,
        membershipStatus: savedUser.membershipStatus,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        token,
        membershipName: fullUser.membershipPlan.name,
        membershipPrice: fullUser.membershipPlan.price,
      };
    } catch (error) {
      console.error('Registration error:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Registration failed. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(userLogin: LoginAuthDto) {
    const { email, password } = userLogin;
    const userFound = await this.usersRepository.findOne({
      where: { email: userLogin.email.toLowerCase() },
      relations: ['role', 'membershipPlan'],
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(password, userFound.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload = {
      id: userFound.id,
      email: userFound.email,
      name: userFound.name,
      role: userFound.role?.name,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: plainToInstance(UserResponseDto, userFound, {
        excludeExtraneousValues: true,
      }),
      token,
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

  async resetPassword(
    resetPasswordDto: ResetPasswordDTO,
  ): Promise<{ message: string }> {
    const record = await this.passwordResetRepository.findOne({
      where: { token: resetPasswordDto.token },
    });

    if (!record) throw new BadRequestException('Invalid or expired token');
    if (record.expiresAt < new Date())
      throw new BadRequestException('Token expired');
    if (record.used)
      throw new BadRequestException('Token has already been used');

    const user = await this.usersRepository.findOne({
      where: { id: record.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    user.password = await hash(resetPasswordDto.newPassword, 10);
    await this.usersRepository.save(user);

    record.used = true;
    await this.passwordResetRepository.save(record);

    return { message: 'Password reset successfully' };
  }

  async refreshToken(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['role', 'membershipPlan'],
    });

    if (!user) throw new NotFoundException('User not found');

    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role?.name,
      membershipStatus: user.membershipStatus,
    };

    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
