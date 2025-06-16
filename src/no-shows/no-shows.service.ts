import { Injectable } from '@nestjs/common';
import { CreateNoShowDto } from './dto/create-no-show.dto';
import { UpdateNoShowDto } from './dto/update-no-show.dto';

@Injectable()
export class NoShowsService {
  create(createNoShowDto: CreateNoShowDto) {
    return 'This action adds a new noShow';
  }

  findAll() {
    return `This action returns all noShows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noShow`;
  }

  update(id: number, updateNoShowDto: UpdateNoShowDto) {
    return `This action updates a #${id} noShow`;
  }

  remove(id: number) {
    return `This action removes a #${id} noShow`;
  }
}
