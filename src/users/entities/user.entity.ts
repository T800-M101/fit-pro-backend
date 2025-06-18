import { Role } from 'src/common/role.enum';
import { Booking } from '../../bookings/entities/booking.entity';
import { NoShow } from '../../no-shows/entities/no-show.entity';
import { Payment } from '../../payments/entities/payment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';

// ----------------- User Entity -----------------
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ name: 'password_hash', type: 'text' })
  password: string;

  @Column({ length: 30, nullable: true })
  gender?: string;

  @Column({ name: 'membership_type', length: 50, nullable: true })
  membershipType?: string;

  @Column({ name: 'allow_email', default: false })
  allowEmail: boolean;

  @Column({ name: 'allow_whatsapp', default: false })
  allowWhatsapp: boolean;

  @Column({ name: 'qr_code', type: 'text', nullable: true })
  qrCode?: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => NoShow, (noShow) => noShow.user)
  noShows: NoShow[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
  @OneToMany(() => PasswordResetToken, token => token.user)
  passwordResetTokens: PasswordResetToken[];
}

