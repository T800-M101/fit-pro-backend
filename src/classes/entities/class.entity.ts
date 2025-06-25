import { ClassSession } from "src/class_session/entities/class_session.entity";
import { Instructor } from "src/instructors/entities/instructor.entity";
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

   @ManyToOne(() => Instructor, instructor => instructor.classes)
  instructor: Instructor;

  @OneToMany(() => ClassSession, (session) => session.class)
  sessions: ClassSession[];
}



