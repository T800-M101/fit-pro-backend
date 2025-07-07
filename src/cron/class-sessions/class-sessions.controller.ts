import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClassSessionsService } from './class-sessions.service';

@Controller('class_sessions')
export class ClassSessionsController {
  constructor(private readonly classSessionsService: ClassSessionsService) {}

@Post('generate')
  async generateSessionsManually() {
    await this.classSessionsService.generateWeeklySessions();
    return { message: 'Sessions generated!' };
  }

  @Get('class/:id')
  async getSessionsByClass(@Param('id', ParseIntPipe) classId: number) {
  const sessions = await this.classSessionsService.getSessionsByClassId(classId);
  return { classId, sessions };
}
}
