import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InstructorsModule } from './instructors/instructors.module';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { MembershipPlansModule } from './membership-plans/membership-plans.module';
import { AuthModule } from './auth/auth.module';
import { PasswordResetTokenModule } from './password-reset-token/password-reset-token.module';
import { EmailService } from './email/email.service';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/entities/user.entity';
import { Booking } from './bookings/entities/booking.entity';
import { PasswordResetToken } from './password-reset-token/entities/password-reset-token.entity';
import { Class } from './classes/entities/class.entity';
import { Instructor } from './instructors/entities/instructor.entity';
import { MembershipPlan } from './membership-plans/entities/membership-plan.entity';
import { Payment } from './payments/entities/payment.entity';
import { Comment } from './comments/entities/comment.entity';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/entities/role.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { ClassSessionsModule } from './cron/class-sessions/class-sessions.module';
import { ScheduleTemplateModule } from './schedule-template/schedule-template.module';
import { ScheduleTemplate } from './schedule-template/entities/schedule-template.entity';
import { ClassSession } from './cron/class-sessions/class-session.entity';
import { DurationModule } from './duration/duration.module';
import { Duration } from './duration/entities/duration.entity';
import { StripeModule } from './payments/stripe/stripe.module';
import { WebhookModule } from './payments/stripe/webhook-module';
import { RawBodyMiddleware } from './payments/stripe/raw-body-middleware.middleware';
import { PaymentReminderModule } from './payments/payment-reminder/payment-reminder.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema: 'public',
        entities: [
          User,
          Booking,
          PasswordResetToken,
          ClassSession,
          Class,
          Comment,
          Instructor,
          MembershipPlan,
          Payment,
          Roles,
          ScheduleTemplate,
          Duration,
          Payment,
        ],
        synchronize: false,
        ssl: true,
        extra: {
          rejectUnauthorized: false, // necesario para Render DB que usa SSL
        },
      }),
    }),
    InstructorsModule,
    UsersModule,
    ClassesModule,
    BookingsModule,
    PaymentsModule,
    MembershipPlansModule,
    AuthModule,
    PasswordResetTokenModule,
    ClassSessionsModule,
    CommentsModule,
    RolesModule,
    ClassSessionsModule,
    ScheduleTemplateModule,
    DurationModule,
    StripeModule,
    WebhookModule,
    PaymentReminderModule,
  ],
  providers: [EmailService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({ path: 'webhooks/webhook', method: RequestMethod.POST });
  }
}
