import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Instructor } from 'src/instructors/entities/instructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Instructor])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
