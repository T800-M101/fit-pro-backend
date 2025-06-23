import { PartialType } from '@nestjs/mapped-types';
import { CreateNoShowUpDto } from './create-no-show-up.dto';

export class UpdateNoShowDto extends PartialType(CreateNoShowUpDto) {}
