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
  
  @Column({ default: false, nullable: false})
  attended: boolean;

  @Column({ default: false, nullable: false})
  cancelled: boolean;

  @Column({ name: 'cancellation_time', nullable: true, type: 'timestamp' })
  cancellationTime: Date | null;  

  @Column({name: 'booking_date', type: 'timestamp with time zone'})
  bookingDate: Date;
  
  @Column({name: 'booking_time', type: 'time without time zone'})
  bookingTime: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ClassSession, classSession => classSession.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_session_id' })
  classSession: ClassSession;

}
