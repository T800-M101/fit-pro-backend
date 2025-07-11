import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { DeepPartial, Repository } from 'typeorm';
import Stripe from 'stripe';
import { User } from 'src/users/entities/user.entity';
import { PaymentMethod } from 'src/common/payment_method.enum';
import { plainToInstance } from 'class-transformer';
import { PaymentHistoryItemDto } from './dto/payment-history-item.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger('Payment Service');
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>){
  }


  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

async recordInitialPayment(session: Stripe.Checkout.Session, userId: number): Promise<Payment> {
  try {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      this.logger.error(`User not found: ${userId}`);
      throw new NotFoundException('User not found');
    }

    if (!session.amount_total) {
      this.logger.warn('Session has no amount_total', { session });
      throw new BadRequestException('Invalid payment amount');
    }

    const duration = Number(session.metadata?.duration) || 1;

    const paymentDay = new Date();

    const dueDate = new Date(paymentDay);

    dueDate.setMonth(dueDate.getMonth() + duration);

    const paymentData = {
      user,
      amount: session.amount_total / 100,
      paymentDay: new Date(),
      dueDate,
      method: this.getPaymentMethod(session),
      status: 'Completed',
      durationInMonths: Number(duration),
      paymentDate: new Date(),
      transactionId: this.getTransactionId(session),
    };

    this.logger.log('Creating payment record', { paymentData });
    const payment = this.paymentRepository.create(paymentData);
    const result = await this.paymentRepository.save(payment);
    this.logger.log('Payment record created', { paymentId: result.id });
    return result;

  } catch (error) {
    this.logger.error('Failed to record payment', {
      error,
      sessionId: session.id,
      userId
    });
    throw new InternalServerErrorException('Failed to record payment');
  }
}

private getPaymentMethod(session: Stripe.Checkout.Session): PaymentMethod {
  const stripeMethod = session.payment_method_types?.[0];
  return stripeMethod && Object.values(PaymentMethod).includes(stripeMethod as PaymentMethod)
    ? stripeMethod as PaymentMethod
    : PaymentMethod.CARD;
}

private getTransactionId(session: Stripe.Checkout.Session): string {
  return typeof session.payment_intent === 'string' 
    ? session.payment_intent 
    : session.id;
}


  async getUserPayments(userId: number) {
  const payments = await this.paymentRepository.find({
    where: { user: { id: userId } },
    order: { paymentDay: 'DESC' }, // most recent first
  });

  return payments.map(p => ({
    id: p.id,
    date: p.paymentDay,
    amount: p.amount,
    method: p.method,
    status: p.status,
    transactionId: `TXN-${p.id}` // Optional: if no real transaction ID yet
  }));
}

async getHistoryForUser(userId: number): Promise<PaymentHistoryItemDto[]> {
    const rows = await this.paymentRepo.find({
      where: { user: { id: userId } },
      order: { paymentDate: 'DESC' },
      relations: ['user'],           
      select: {
        id: true,
        paymentDate: true,
        amount: true,
        method: true,
        status: true,
        transactionId: true,
      },
    });

    /* Map fields so frontend gets `date` instead of `paymentDate` */
    const mapped = rows.map((p) => ({
      id:            p.id,
      date:          p.paymentDate,
      amount:        Number(p.amount),
      method:        p.method,
      status:        p.status ?? 'Unknown',
      transactionId: p.transactionId ?? null,
    }));

    return plainToInstance(PaymentHistoryItemDto, mapped, {
      excludeExtraneousValues: true,
    });
  }


  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
