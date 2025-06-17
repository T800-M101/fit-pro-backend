import { Injectable } from '@nestjs/common';
import { CreateMembershipPlanDto } from './dto/create-membership-plan.dto';
import { UpdateMembershipPlanDto } from './dto/update-membership-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipPlan } from './entities/membership-plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipPlansService {


  constructor(@InjectRepository(MembershipPlan) private membershipPlanRepository: Repository<MembershipPlan>){}
    
  async findAll(): Promise<MembershipPlan[]> {
      return this.membershipPlanRepository.find();
  }


  create(createMembershipPlanDto: CreateMembershipPlanDto) {
    return 'This action adds a new membershipPlan';
  }
  
  findOne(id: number) {
    return `This action returns a #${id} membershipPlan`;
  }

  update(id: number, updateMembershipPlanDto: UpdateMembershipPlanDto) {
    return `This action updates a #${id} membershipPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} membershipPlan`;
  }
}
