import { Module } from '@nestjs/common';
import { DurationService } from './duration.service';
import { DurationController } from './duration.controller';
import { Duration } from './entities/duration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Duration])
  ],
  controllers: [DurationController],
  providers: [DurationService],
})
export class DurationModule {}
