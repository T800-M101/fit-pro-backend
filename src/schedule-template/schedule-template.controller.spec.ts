import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTemplateController } from './schedule-template.controller';
import { ScheduleTemplateService } from './schedule-template.service';

describe('ScheduleTemplateController', () => {
  let controller: ScheduleTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleTemplateController],
      providers: [ScheduleTemplateService],
    }).compile();

    controller = module.get<ScheduleTemplateController>(ScheduleTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
