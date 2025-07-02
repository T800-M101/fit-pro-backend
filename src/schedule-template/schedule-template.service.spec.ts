import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTemplateService } from './schedule-template.service';

describe('ScheduleTemplateService', () => {
  let service: ScheduleTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleTemplateService],
    }).compile();

    service = module.get<ScheduleTemplateService>(ScheduleTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
