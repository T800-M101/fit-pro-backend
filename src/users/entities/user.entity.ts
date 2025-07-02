
import { Booking } from '../../bookings/entities/booking.entity';
import { PasswordResetToken } from '../../password-reset-token/entities/password-reset-token.entity';
import { Comment } from '../../comments/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Payment } from 'src/payments/entities/payment.entity';
import { MembershipPlan } from 'src/membership-plans/entities/membership-plan.entity';
import { Roles } from 'src/roles/entities/role.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ name: 'password_hash', type: 'text' })
  password: string;

  @Column({ length: 30, nullable: false })
  gender?: string;

  @Column({name: 'membership_status', type: 'boolean', default: false})
  membershipStatus

  @Column({ name: 'allow_email', default: false })
  allowEmail: boolean;

  @Column({ name: 'allow_whatsapp', default: false })
  allowWhatsapp: boolean;

  @Column({ name: 'qr_code', type: 'text', nullable: true })
  qrCode?: string;

  @Column({ name: 'role_id', type: 'int', nullable: true, default: 3 })
  roleId?: number;  

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => PasswordResetToken)
  passwordResetToken: PasswordResetToken;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Comment, (comment) => comment.user )
  comments: Comment[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

 @ManyToOne(() => MembershipPlan, { nullable: false })
 @JoinColumn({ name: 'membership_id' }) 
 membershipPlan?: MembershipPlan;

 @ManyToOne(() => Roles, { nullable: true },) 
 @JoinColumn({ name: 'role_id' }) 
 role?: Roles;
}


