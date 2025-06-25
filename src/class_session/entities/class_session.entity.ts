import { Booking } from 'src/bookings/entities/booking.entity';
import { Class } from 'src/classes/entities/class.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity('class_sessions')
export class ClassSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true})
  date: Date;

  @Column({ type: 'int', name: 'total_spots', nullable: false, default: 0 })
  totalSpots: number;
  
  @Column({type: 'int', name: 'available_spots', nullable: true})
  availableSpots: number;

  @Column({name: 'start_time', type:'time', nullable: true})
  startTime: string;


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Class, (classEntity) => classEntity.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @OneToMany(() => Booking, booking => booking.classSession)
  bookings: Booking[];
}



