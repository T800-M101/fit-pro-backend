import { ClassSession } from "../../classes/entities/class-session.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('no_shows')
export class NoShow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.noShows)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ClassSession, (session) => session.noShows)
  @JoinColumn({ name: 'class_session_id' })
  classSession: ClassSession;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
