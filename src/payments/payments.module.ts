import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { PaymentReminderService } from './payment-reminder/payment-reminder.service';
import { PaymentReminderModule } from './payment-reminder/payment-reminder.module';
import { EmailModule } from 'src/email/email.module';


@Module({
  imports: [
  TypeOrmModule.forFeature([Payment, User]),
  PaymentReminderModule,
  EmailModule
],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentReminderService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
