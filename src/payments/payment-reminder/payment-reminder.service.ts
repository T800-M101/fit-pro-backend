import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { Between, LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PaymentReminderService {
  private readonly logger = new Logger(PaymentReminderService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  /** Runs every day at 09:00 server time */
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async processPayments(): Promise<void> {
    const today     = new Date();          today.setHours(0, 0, 0, 0);
    const threeFrom = new Date(today);     threeFrom.setDate(today.getDate() + 3);

    /* ------------------------------------------------------------------ */
    /* 1.  SEND REMINDERS – due in next 3 days, still “Completed”         */
    /* ------------------------------------------------------------------ */
    const dueSoon = await this.paymentRepo.find({
      where: { dueDate: Between(today, threeFrom), status: 'Completed' },
      relations: ['user'],
    });

    for (const p of dueSoon) {
      const html = `
        <p>Hi ${p.user.name},</p>
        <p>Your membership ($${p.amount.toFixed(2)}) expires on
           <strong>${p.dueDate.toDateString()}</strong>.</p>
        <p>Please renew it to keep enjoying our classes.</p>`;
      try {
        await this.emailService.send({
          to:       p.user.email,
          subject:  'Membership renewal reminder',
          html,
        });
        this.logger.verbose(`Reminder sent to ${p.user.email}`);
      } catch (err) {
        this.logger.error(`Failed to email ${p.user.email}`, err);
      }
    }

    /* ------------------------------------------------------------------ */
    /* 2.  DEACTIVATE MEMBERSHIPS – past due & not renewed                */
    /* ------------------------------------------------------------------ */
    const overdue = await this.paymentRepo.find({
      where: { dueDate: LessThan(today), status: 'Completed' },
      relations: ['user'],
    });

    for (const p of overdue) {
      if (p.user.membershipStatus) {
        // set user.membershipStatus = false
        await this.userRepo.update(p.user.id, { membershipStatus: false as unknown as any });
        this.logger.warn(
          `Membership deactivated for user #${p.user.id} (payment ${p.id})`,
        );

        // (optional) mark payment as expired to avoid repeating work
        await this.paymentRepo.update(p.id, { status: 'Expired' });

        // (optional) send final notice
        await this.emailService.send({
          to:      p.user.email,
          subject: 'Membership expired',
          html:    `<p>Your membership expired on
                    ${p.dueDate.toDateString()}. Please renew to regain access.</p>`,
        });
      }
    }
  }
}
