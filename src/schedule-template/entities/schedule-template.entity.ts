import { Class } from "src/classes/entities/class.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedule_templates')
export class ScheduleTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'day_of_week'})
  dayOfWeek: number; // 0 = Sunday, ..., 6 = Saturday

  // Just the time part (e.g. "06:00")
  @Column({ name: 'start_time', type: 'time without time zone' })
  startTime: string;

  @Column({ name: 'total_spots', type: 'int', default: 0 })
  totalSpots: number;

  @ManyToOne(() => Class, cls => cls.scheduleTemplates, { onDelete: 'CASCADE' })
  class: Class;
}

