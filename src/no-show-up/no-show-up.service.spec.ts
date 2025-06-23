import { Test, TestingModule } from '@nestjs/testing';
import { NoShowUpService } from './no-show-up.service';

describe('NoShowsService', () => {
  let service: NoShowUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoShowUpService],
    }).compile();

    service = module.get<NoShowUpService>(NoShowUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
