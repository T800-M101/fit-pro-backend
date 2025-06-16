import { PartialType } from '@nestjs/mapped-types';
import { CreateNoShowDto } from './create-no-show.dto';

export class UpdateNoShowDto extends PartialType(CreateNoShowDto) {}
