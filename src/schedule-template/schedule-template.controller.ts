import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleTemplateService } from './schedule-template.service';
import { CreateScheduleTemplateDto } from './dto/create-schedule-template.dto';
import { UpdateScheduleTemplateDto } from './dto/update-schedule-template.dto';

@Controller('schedule-template')
export class ScheduleTemplateController {
  constructor(private readonly scheduleTemplateService: ScheduleTemplateService) {}

  @Post('create')
create(@Body() dto: CreateScheduleTemplateDto) {
  return this.scheduleTemplateService.create(dto);
}

  @Get()
  findAll() {
    return this.scheduleTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleTemplateDto: UpdateScheduleTemplateDto) {
    return this.scheduleTemplateService.update(+id, updateScheduleTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleTemplateService.remove(+id);
  }
}
