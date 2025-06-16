import { Module } from '@nestjs/common';
import { NoShowsService } from './no-shows.service';
import { NoShowsController } from './no-shows.controller';

@Module({
  controllers: [NoShowsController],
  providers: [NoShowsService],
})
export class NoShowsModule {}
