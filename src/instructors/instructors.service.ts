import { Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstructorsService {

  constructor(@InjectRepository(Instructor) private instructorsRepository: Repository<Instructor>){}
  
  async findAll(): Promise<Instructor[]> {
    return this.instructorsRepository.find();
  }

  create(createInstructorDto: CreateInstructorDto) {
    return 'This action adds a new instructor';
  }


  findOne(id: number) {
    return `This action returns a #${id} instructor`;
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}
