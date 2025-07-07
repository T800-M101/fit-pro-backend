import { Injectable } from '@nestjs/common';
import { CreateDurationDto } from './dto/create-duration.dto';
import { UpdateDurationDto } from './dto/update-duration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Duration } from './entities/duration.entity';

@Injectable()
export class DurationService {

  constructor(@InjectRepository(Duration)
               private readonly durationsRepository: Repository<Duration>){}

  create(createDurationDto: CreateDurationDto) {
    return 'This action adds a new duration';
  }

  findAll(): Promise<Duration[]> {
    return this.durationsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} duration`;
  }

  update(id: number, updateDurationDto: UpdateDurationDto) {
    return `This action updates a #${id} duration`;
  }

  remove(id: number) {
    return `This action removes a #${id} duration`;
  }
}
