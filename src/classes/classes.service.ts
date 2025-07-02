import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';

@Injectable()
export class ClassesService {


  constructor(@InjectRepository(Class)
    private classesRepository: Repository<Class>,

    @InjectRepository(Instructor)
    private instructorsRepository: Repository<Instructor>){}

  async getClassesInfo(): Promise<Class[]> {
    return this.classesRepository.find();
  }

 async create(createClassDto: CreateClassDto): Promise<Class> {
  console.log(new Date())
    const { instructorId, ...classData } = createClassDto;

    // Buscar instructor
    const instructor = await this.instructorsRepository.findOneBy({ id: instructorId });
    if (!instructor) {
      throw new NotFoundException(`Instructor with id ${instructorId} not found`);
    }

    // Crear la clase
    const newClass = this.classesRepository.create({
      ...classData,
      instructor,
    });

    return this.classesRepository.save(newClass);
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



       