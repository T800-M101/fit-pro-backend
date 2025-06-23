import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ClassSchedulesService } from './class_schedules.service';


@Controller('schedules')
export class ClassSchedulesController {
  constructor(private readonly schedulesService: ClassSchedulesService) {}


// @Get('class/:classId')
//   async getScheduleByClassId(@Param('classId', ParseIntPipe) classId: number) {
//     return this.schedulesService.getScheduleByClassId(classId);
//   }
  

 
 }
