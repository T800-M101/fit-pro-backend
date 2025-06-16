import { ClassSession } from "../../classes/entities/class-session.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('bookings')
@Unique(['user', 'classSession'])
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ClassSession, (session) => session.bookings)
  @JoinColumn({ name: 'class_session_id' })
  classSession: ClassSession;

  @Column({ default: false })
  attended: boolean;

  @CreateDateColumn({ name: 'booked_at' })
  bookedAt: Date;
}
