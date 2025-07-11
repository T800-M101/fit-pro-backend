import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { EmailModule } from 'src/email/email.module';
import { PaymentReminderService } from './payment-reminder.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User]), EmailModule],
  providers: [PaymentReminderService],
  exports: [PaymentReminderService],
})
export class PaymentReminderModule {}
