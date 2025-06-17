import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('membership_plans')
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column('numeric', { precision: 6, scale: 2 })
  price: number;

  @Column('text', { nullable: true })
  description?: string;

  // Benefits is an array of objects { feature: string; included: boolean }
  @Column('jsonb', { nullable: true })
  benefits?: { feature: string; included: boolean }[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}


