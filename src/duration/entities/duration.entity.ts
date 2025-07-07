import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('durations')
export class Duration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., '1 month', '3 months'

  @Column('int')
  months: number; // e.g., 1, 3, 6, 12

  @Column('decimal', { precision: 5, scale: 2 })
  multiplier: number; // e.g., 1.00, 2.70, 5.10, 9.00
}
