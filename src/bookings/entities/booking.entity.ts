
import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  attended: boolean;

  @CreateDateColumn({ name: 'booked_at' })
  bookedAt: Date;
}
