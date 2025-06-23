import { Injectable } from '@nestjs/common';
import { CreateNoShowUpDto } from './dto/create-no-show-up.dto';

@Injectable()
export class NoShowUpService {
  create(createNoShowUpDto: CreateNoShowUpDto) {
    return 'This action adds a new noShow';
  }

  findAll() {
    return `This action returns all noShows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noShow`;
  }

  update(id: number, updateNoShowUpDto: CreateNoShowUpDto) {
    return `This action updates a #${id} noShow`;
  }

  remove(id: number) {
    return `This action removes a #${id} noShow`;
  }
}
