import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { EmailModule } from 'src/email/email.module';
import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwtStrategy';
import { Roles } from 'src/roles/entities/role.entity';
import { MembershipPlan } from 'src/membership-plans/entities/membership-plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PasswordResetToken, Roles, MembershipPlan]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h'},
    }),
    EmailModule,
  ],
  controllers: [AuthController ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
