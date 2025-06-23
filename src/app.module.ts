import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { InstructorsModule } from './instructors/instructors.module';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { MembershipPlansModule } from './membership-plans/membership-plans.module';
import { AuthModule } from './auth/auth.module';
import { PasswordResetTokenModule } from './password-reset-token/password-reset-token.module';
import { EmailService } from './email/email.service';
import { NoShowUpModule } from './no-show-up/no-show-up.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // <-- here use ConfigModule, NOT ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),  // Cast port to number
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema: 'public',
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      }),
    }),
    InstructorsModule,
    UsersModule,
    ClassesModule,
    BookingsModule,
    NoShowUpModule,
    PaymentsModule,
    MembershipPlansModule,
    AuthModule,
    PasswordResetTokenModule,
  ],
  providers: [EmailService],
})
export class AppModule {}