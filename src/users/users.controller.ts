import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return 'PROTEGIDO';
  }


  @Get('count')
  async countUsers(): Promise <number> {
    const count = await this.usersService.countUsers();
    return count;
  }
  
  @UseInterceptors(SerializeInterceptor)
  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @UseInterceptors(SerializeInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req): Promise<UserResponseDto> {
    const userId = req.user?.id;
    const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
    return plainToInstance(UserResponseDto, updatedUser);

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}


 
  