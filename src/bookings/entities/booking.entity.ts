import { ClassSession } from 'src/cron/class-sessions/class-session.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';


@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId?: number;

  @Column({ default: false })
  attended: boolean;

  @Column({ default: false })
  cancelled: boolean;

  @Column({ name: 'cancellation_time', type: 'timestamptz', nullable: true })
  cancellationTime: Date | null;

  // Stores full timestamp of when the booking was made
  @Column({ name: 'booking_date', type: 'timestamptz' })
  bookingDate: Date;

  // Stores time only, such as "06:00"
  @Column({ name: 'booking_time', type: 'time without time zone' })
  bookingTime: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ClassSession, session => session.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_session_id' })
  classSession: ClassSession;
}
