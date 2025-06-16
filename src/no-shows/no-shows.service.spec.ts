import { Test, TestingModule } from '@nestjs/testing';
import { NoShowsService } from './no-shows.service';

describe('NoShowsService', () => {
  let service: NoShowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoShowsService],
    }).compile();

    service = module.get<NoShowsService>(NoShowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
