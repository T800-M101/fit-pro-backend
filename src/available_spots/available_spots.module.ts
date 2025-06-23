import { Module } from '@nestjs/common';
import { AvailableSpotsService } from './available_spots.service';
import { AvailableSpotsController } from './available_spots.controller';

@Module({
  controllers: [AvailableSpotsController],
  providers: [AvailableSpotsService],
})
export class AvailableSpotsModule {}
