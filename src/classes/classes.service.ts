import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClassesService {


  constructor(@InjectRepository(Class) private readonly classRepository: Repository<Class>){}

  async getClassesInfo(): Promise<Class[]> {
    return this.classRepository.find();
  }


  
  create(createClassDto: CreateClassDto) {
    return 'This action adds a new class';
  }


  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
