import { Module } from '@nestjs/common';
import { NoShowUpController } from '../no-show-up/no-show-up.controller';
import { NoShowUpService } from '../no-show-up/no-show-up.service';


@Module({
  controllers: [NoShowUpController],
  providers: [NoShowUpService],
})
export class NoShowUpModule {}
