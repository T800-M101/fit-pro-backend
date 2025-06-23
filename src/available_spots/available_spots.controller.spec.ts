import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSpotsController } from './available_spots.controller';
import { AvailableSpotsService } from './available_spots.service';

describe('AvailableSpotsController', () => {
  let controller: AvailableSpotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailableSpotsController],
      providers: [AvailableSpotsService],
    }).compile();

    controller = module.get<AvailableSpotsController>(AvailableSpotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
