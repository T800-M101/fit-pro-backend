import { PartialType } from '@nestjs/mapped-types';
import { CreateClassSessionDto } from './create-class_session.dto';

export class UpdateClassSessionDto extends PartialType(
  CreateClassSessionDto,
) {}
