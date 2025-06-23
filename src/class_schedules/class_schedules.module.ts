import {  Module } from '@nestjs/common';
import { ClassSchedulesService } from './class_schedules.service';
import { ClassSchedulesController } from './class_schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [ClassSchedulesController],
  providers: [ClassSchedulesService],
  exports: [TypeOrmModule]
})
export class ClassSchedulesModule {}
