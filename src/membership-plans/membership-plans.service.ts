import { Injectable } from '@nestjs/common';
import { CreateMembershipPlanDto } from './dto/create-membership-plan.dto';
import { UpdateMembershipPlanDto } from './dto/update-membership-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipPlan } from './entities/membership-plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipPlansService {


  constructor(@InjectRepository(MembershipPlan) private membershipPlanRepo: Repository<MembershipPlan>){}
    
  async findAll(): Promise<MembershipPlan[]> {
      return this.membershipPlanRepo.find();
  }


 async create(createMembershipPlanDto: CreateMembershipPlanDto): Promise<MembershipPlan> {
    const newPlan = this.membershipPlanRepo.create(createMembershipPlanDto);
    return await this.membershipPlanRepo.save(newPlan);
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
