import { Injectable } from '@nestjs/common';
import { CreatePasswordResetTokenDto } from './dto/create-password-reset-token.dto';
import { UpdatePasswordResetTokenDto } from './dto/update-password-reset-token.dto';

@Injectable()
export class PasswordResetTokenService {
  create(createPasswordResetTokenDto: CreatePasswordResetTokenDto) {
    return 'This action adds a new passwordResetToken';
  }

  findAll() {
    return `This action returns all passwordResetToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordResetToken`;
  }

  update(id: number, updatePasswordResetTokenDto: UpdatePasswordResetTokenDto) {
    return `This action updates a #${id} passwordResetToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordResetToken`;
  }
}
