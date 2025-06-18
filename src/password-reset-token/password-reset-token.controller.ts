import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasswordResetTokenService } from './password-reset-token.service';
import { CreatePasswordResetTokenDto } from './dto/create-password-reset-token.dto';
import { UpdatePasswordResetTokenDto } from './dto/update-password-reset-token.dto';

@Controller('password-reset-token')
export class PasswordResetTokenController {
  constructor(private readonly passwordResetTokenService: PasswordResetTokenService) {}

  @Post()
  create(@Body() createPasswordResetTokenDto: CreatePasswordResetTokenDto) {
    return this.passwordResetTokenService.create(createPasswordResetTokenDto);
  }

  @Get()
  findAll() {
    return this.passwordResetTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordResetTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordResetTokenDto: UpdatePasswordResetTokenDto) {
    return this.passwordResetTokenService.update(+id, updatePasswordResetTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordResetTokenService.remove(+id);
  }
}
