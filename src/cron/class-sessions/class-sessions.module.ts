import { Module } from '@nestjs/common';
import { ClassSessionsService } from './class-sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/classes/entities/class.entity';
import { ClassSessionsController } from './class-sessions.controller';
import { ScheduleTemplate } from 'src/schedule-template/entities/schedule-template.entity';
import { ClassSession } from './class-session.entity';

@Module({
    providers: [ClassSessionsService],
    imports: [
    TypeOrmModule.forFeature([Class, ClassSession, ScheduleTemplate ]), 
  ],
  controllers: [ClassSessionsController],
})
export class ClassSessionsModule {}
