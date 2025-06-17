import { Module } from '@nestjs/common';
import { MembershipPlansService } from './membership-plans.service';
import { MembershipPlansController } from './membership-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipPlan } from './entities/membership-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipPlan])],
  controllers: [MembershipPlansController],
  providers: [MembershipPlansService],
})
export class MembershipPlansModule {}
