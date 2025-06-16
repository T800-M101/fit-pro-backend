import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./class.entity";
import { Booking } from "../../bookings/entities/booking.entity";
import { NoShow } from "../../no-shows/entities/no-show.entity";

@Entity('class_sessions')
export class ClassSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (cls) => cls.sessions)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;

  @Column({ name: 'available_spots', type: 'int', nullable: true })
  availableSpots?: number;

  @OneToMany(() => Booking, (booking) => booking.classSession)
  bookings: Booking[];

  @OneToMany(() => NoShow, (noShow) => noShow.classSession)
  noShows: NoShow[];
}