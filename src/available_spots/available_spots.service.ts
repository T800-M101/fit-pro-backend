import { Injectable } from '@nestjs/common';
import { CreateAvailableSpotDto } from './dto/create-available_spot.dto';
import { UpdateAvailableSpotDto } from './dto/update-available_spot.dto';

@Injectable()
export class AvailableSpotsService {
  create(createAvailableSpotDto: CreateAvailableSpotDto) {
    return 'This action adds a new availableSpot';
  }

  findAll() {
    return `This action returns all availableSpots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availableSpot`;
  }

  update(id: number, updateAvailableSpotDto: UpdateAvailableSpotDto) {
    return `This action updates a #${id} availableSpot`;
  }

  remove(id: number) {
    return `This action removes a #${id} availableSpot`;
  }
}
