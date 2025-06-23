
import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity('no_show_up')
export class NoShowUp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
