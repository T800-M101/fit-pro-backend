import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoShowUpService } from './no-show-up.service';
import { CreateNoShowUpDto } from './dto/create-no-show-up.dto';


@Controller('no-shows')
export class NoShowUpController {
  constructor(private readonly noShowUpService: NoShowUpService) {}

  @Post()
  create(@Body() createNoShowUpDto: CreateNoShowUpDto) {
    return this.noShowUpService.create(createNoShowUpDto);
  }

  @Get()
  findAll() {
    return this.noShowUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noShowUpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoShowUpDto: CreateNoShowUpDto) {
    return this.noShowUpService.update(+id, updateNoShowUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noShowUpService.remove(+id);
  }
}
