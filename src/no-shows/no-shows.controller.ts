import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoShowsService } from './no-shows.service';
import { CreateNoShowDto } from './dto/create-no-show.dto';
import { UpdateNoShowDto } from './dto/update-no-show.dto';

@Controller('no-shows')
export class NoShowsController {
  constructor(private readonly noShowsService: NoShowsService) {}

  @Post()
  create(@Body() createNoShowDto: CreateNoShowDto) {
    return this.noShowsService.create(createNoShowDto);
  }

  @Get()
  findAll() {
    return this.noShowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noShowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoShowDto: UpdateNoShowDto) {
    return this.noShowsService.update(+id, updateNoShowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noShowsService.remove(+id);
  }
}
