import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DurationService } from './duration.service';
import { CreateDurationDto } from './dto/create-duration.dto';
import { UpdateDurationDto } from './dto/update-duration.dto';

@Controller('duration')
export class DurationController {
  constructor(private readonly durationService: DurationService) {}

  @Post()
  create(@Body() createDurationDto: CreateDurationDto) {
    return this.durationService.create(createDurationDto);
  }

  @Get()
  findAll() {
    return this.durationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.durationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDurationDto: UpdateDurationDto) {
    return this.durationService.update(+id, updateDurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.durationService.remove(+id);
  }
}
