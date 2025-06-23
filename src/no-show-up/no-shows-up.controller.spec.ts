import { Test, TestingModule } from '@nestjs/testing';
import { NoShowUpController } from './no-show-up.controller';
import { NoShowUpService } from './no-show-up.service';



describe('NoShowUpController', () => {
  let controller: NoShowUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoShowUpController],
      providers: [NoShowUpService],
    }).compile();

    controller = module.get<NoShowUpController>(NoShowUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
