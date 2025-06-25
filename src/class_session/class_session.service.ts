import { Injectable } from '@nestjs/common';
import { CreateClassSessionDto } from './dto/create-class_session.dto';
import { UpdateClassSessionDto } from './dto/update-class_session.dto';

@Injectable()
export class ClassSessionService {
  create(createClassSessionDto: CreateClassSessionDto) {
    return 'This action adds a new classsSession';
  }

  findAll() {
    return `This action returns all classsSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classsSession`;
  }

  update(id: number, updateClassSessionDto: UpdateClassSessionDto) {
    return `This action updates a #${id} classsSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} classsSession`;
  }
}
