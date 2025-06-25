import { Test, TestingModule } from '@nestjs/testing';
import { ClassSessionController } from './class_session.controller';
import { ClassSessionService } from './class_session.service';

describe('ClasssSessionController', () => {
  let controller: ClassSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassSessionController],
      providers: [ClassSessionService],
    }).compile();

    controller = module.get<ClassSessionController>(ClassSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
