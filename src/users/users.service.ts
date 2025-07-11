import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async countUsers(): Promise<number> {
    return this.usersRepository.count();
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(userId: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    // Only hash and update password if it was provided
    if (dto.password) {
      const hashedPassword = await hash(dto.password, 10);
      user.password = hashedPassword;
    }

    if (dto.name) user.name = dto.name;
    if (dto.email) user.email = dto.email;
    if (dto.phone) user.phone = dto.phone;

    return this.usersRepository.save(user);
  }

  async activateMembership(userId: number) {
  const user = await this.usersRepository.findOneBy({ id: userId });
  if (!user) throw new NotFoundException('User not found');

  user.membershipStatus = true;
  user.updatedAt = new Date();

  return this.usersRepository.save(user);
}

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
