import { Test, TestingModule } from '@nestjs/testing';
import { ClassSchedulesController } from './class_schedules.controller';
import { ClassSchedulesService } from './class_schedules.service';

describe('ClassSchedulesController', () => {
  let controller: ClassSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassSchedulesController],
      providers: [ClassSchedulesService],
    }).compile();

    controller = module.get<ClassSchedulesController>(ClassSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
