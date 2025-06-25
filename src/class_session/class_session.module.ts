import { Module } from '@nestjs/common';
import { ClassSessionService } from './class_session.service';
import { ClassSessionController } from './class_session.controller';

@Module({
  controllers: [ClassSessionController],
  providers: [ClassSessionService],
})
export class ClasssSessionModule {}
