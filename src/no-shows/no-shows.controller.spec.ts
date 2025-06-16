import { Test, TestingModule } from '@nestjs/testing';
import { NoShowsController } from './no-shows.controller';
import { NoShowsService } from './no-shows.service';

describe('NoShowsController', () => {
  let controller: NoShowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoShowsController],
      providers: [NoShowsService],
    }).compile();

    controller = module.get<NoShowsController>(NoShowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
