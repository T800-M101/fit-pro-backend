import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

async register(userAuthDto: RegisterAuthDto) {
  const { password, ...userData } = userAuthDto;

  // Check if email already exists
  const existingUser = await this.usersRepository.findOne({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new HttpException('Email already in use', HttpStatus.CONFLICT);
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  const newUser = this.usersRepository.create({
    ...userData,
    password: hashedPassword,
  });

  const savedUser = await this.usersRepository.save(newUser);

 
  const payload = { sub: savedUser.id, name: savedUser.fullName, role: savedUser.role };
  const token = await this.jwtService.signAsync(payload);

  return { token }; 
}


  async login(userLogin: LoginAuthDto) {
    const { email, password } = userLogin;
    const userFound = await this.usersRepository.findOne({ where: { email } });

    if (!userFound) {
      throw new HttpException('User not found', 404);
    }

    const checkPassword = await compare(password, userFound.password);

    if (!checkPassword) {
      return new HttpException('wrong credentials', 403);
    }

    const payload = { id: userFound.id, email: userFound.email, name: userFound.fullName, role: userFound.role };
    const token = this.jwtService.sign(payload);

    return {
      user: plainToInstance(UserResponseDto, userFound,  {excludeExtraneousValues: true}),
      token
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: RegisterAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
