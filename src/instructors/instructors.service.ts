import { Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstructorsService {

  constructor(@InjectRepository(Instructor) private instructorsRepo: Repository<Instructor>){}
  
  async findAll(): Promise<Instructor[]> {
    return this.instructorsRepo.find();
  }

  async create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    const instructor = this.instructorsRepo.create(createInstructorDto);
    return await this.instructorsRepo.save(instructor);
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
