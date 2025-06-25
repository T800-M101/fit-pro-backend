import {
  Controller,
 
} from '@nestjs/common';
import { ClassSessionService } from './class_session.service';


@Controller('class-session')
export class ClassSessionController {
  constructor(private readonly classsSessionService: ClassSessionService) {}

 
}
