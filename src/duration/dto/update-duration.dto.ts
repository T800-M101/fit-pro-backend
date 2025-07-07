import { PartialType } from '@nestjs/mapped-types';
import { CreateDurationDto } from './create-duration.dto';

export class UpdateDurationDto extends PartialType(CreateDurationDto) {}
