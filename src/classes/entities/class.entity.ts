import { Instructor } from "../../instructors/entities/instructor.entity";
import { ClassSession } from "../../classes/entities/class-session.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  photo?: string;

  @Column({ name: 'duration_minutes', type: 'int', nullable: true })
  durationMinutes?: number;

  @Column({ length: 20, nullable: true })
  intensity?: string;

  @ManyToOne(() => Instructor, (instructor) => instructor.classes, { nullable: true })
  @JoinColumn({ name: 'instructor_id' })
  instructor?: Instructor;

  @Column({ name: 'max_students', type: 'int' })
  maxStudents: number;

  @OneToMany(() => ClassSession, (session) => session.class)
  sessions: ClassSession[];
}
