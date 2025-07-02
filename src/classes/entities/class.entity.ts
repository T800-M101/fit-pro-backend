import { ClassSession } from "src/cron/class-sessions/class-session.entity";
import { Instructor } from "src/instructors/entities/instructor.entity";
import { ScheduleTemplate } from "src/schedule-template/entities/schedule-template.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: false })
  description?: string;

  @Column({ type: 'text', nullable: false })
  photo?: string;

  @Column({ name: 'duration_minutes', type: 'int', nullable: false })
  durationMinutes?: number;

  @Column({ length: 20, nullable: false })
  intensity?: string;

  @Column({name: 'default_spots', type: 'int', default: 0})
  defaultSpots: number;

  @ManyToOne(() => Instructor, instructor => instructor.classes)
  instructor: Instructor;


  @OneToMany(() => ClassSession, (session) => session.class)
  sessions: ClassSession[];

  @OneToMany(() => ScheduleTemplate, template => template.class)
  scheduleTemplates: ScheduleTemplate[];
}



