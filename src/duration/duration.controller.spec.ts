import { Test, TestingModule } from '@nestjs/testing';
import { DurationController } from './duration.controller';
import { DurationService } from './duration.service';

describe('DurationController', () => {
  let controller: DurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DurationController],
      providers: [DurationService],
    }).compile();

    controller = module.get<DurationController>(DurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
