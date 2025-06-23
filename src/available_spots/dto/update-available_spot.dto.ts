import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailableSpotDto } from './create-available_spot.dto';

export class UpdateAvailableSpotDto extends PartialType(CreateAvailableSpotDto) {}
