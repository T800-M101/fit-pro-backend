import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailableSpotsService } from './available_spots.service';
import { CreateAvailableSpotDto } from './dto/create-available_spot.dto';
import { UpdateAvailableSpotDto } from './dto/update-available_spot.dto';

@Controller('available-spots')
export class AvailableSpotsController {
  constructor(private readonly availableSpotsService: AvailableSpotsService) {}

  @Post()
  create(@Body() createAvailableSpotDto: CreateAvailableSpotDto) {
    return this.availableSpotsService.create(createAvailableSpotDto);
  }

  @Get()
  findAll() {
    return this.availableSpotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availableSpotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailableSpotDto: UpdateAvailableSpotDto) {
    return this.availableSpotsService.update(+id, updateAvailableSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availableSpotsService.remove(+id);
  }
}
