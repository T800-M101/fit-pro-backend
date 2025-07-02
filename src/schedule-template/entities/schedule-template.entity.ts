import { Class } from "src/classes/entities/class.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedule_templates')
export class ScheduleTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  @Column('text')
  startTime: string; // e.g. "06:00"

  @Column({name:'total_spot', type: 'int', default: 0})
  totalSpots: number;


  @ManyToOne(() => Class, cls => cls.scheduleTemplates, { onDelete: 'CASCADE' })
  class: Class;
}
