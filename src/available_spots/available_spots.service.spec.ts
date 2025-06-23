import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSpotsService } from './available_spots.service';

describe('AvailableSpotsService', () => {
  let service: AvailableSpotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailableSpotsService],
    }).compile();

    service = module.get<AvailableSpotsService>(AvailableSpotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
