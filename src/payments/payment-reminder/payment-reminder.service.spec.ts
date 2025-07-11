import { Test, TestingModule } from '@nestjs/testing';
import { PaymentReminderService } from './payment-reminder.service';

describe('PaymentReminderServiceService', () => {
  let service: PaymentReminderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentReminderService],
    }).compile();

    service = module.get<PaymentReminderService>(PaymentReminderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
