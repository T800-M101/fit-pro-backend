import { Module } from '@nestjs/common';
import { ScheduleTemplateService } from './schedule-template.service';
import { ScheduleTemplateController } from './schedule-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleTemplate } from './entities/schedule-template.entity';
import { Class } from 'src/classes/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleTemplate, Class])],
  controllers: [ScheduleTemplateController],
  providers: [ScheduleTemplateService],
})
export class ScheduleTemplateModule {}
