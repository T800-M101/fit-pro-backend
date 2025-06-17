import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {


constructor(@InjectRepository(User) private usersRepository: Repository<User>){}


  async findAll(): Promise<User[]>  {
     return this.usersRepository.find();
  }

  async countUsers(): Promise<number> {
    return this.usersRepository.count();
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
