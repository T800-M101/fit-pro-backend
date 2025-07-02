import { Injectable } from '@nestjs/common';
import { CreateScheduleTemplateDto } from './dto/create-schedule-template.dto';
import { UpdateScheduleTemplateDto } from './dto/update-schedule-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleTemplate } from './entities/schedule-template.entity';
import { Class } from 'src/classes/entities/class.entity';

@Injectable()
export class ScheduleTemplateService {

  constructor(
    @InjectRepository(ScheduleTemplate)
    private readonly templateRepo: Repository<ScheduleTemplate>,

    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,
  ) {}


  async create(dto: CreateScheduleTemplateDto): Promise<{ id: number; dayOfWeek: number; startTime: string }[]> {
  const gymClass = await this.classRepo.findOneBy({ id: dto.classId });
  if (!gymClass) throw new Error('Class not found');

  const templates = dto.startTimes.map(time =>
    this.templateRepo.create({
      class: gymClass,
      dayOfWeek: dto.dayOfWeek,
      startTime: time,
    }),
  );

  const savedTemplates = await this.templateRepo.save(templates);

  // Return only selected fields without the 'class' relation
  return savedTemplates.map(template => ({
    id: template.id,
    dayOfWeek: template.dayOfWeek,
    startTime: template.startTime,
  }));
}


  async findAll(): Promise<ScheduleTemplate[]> {
    return this.templateRepo.find({ relations: ['class'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleTemplate`;
  }

  update(id: number, updateScheduleTemplateDto: UpdateScheduleTemplateDto) {
    return `This action updates a #${id} scheduleTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleTemplate`;
  }
}
