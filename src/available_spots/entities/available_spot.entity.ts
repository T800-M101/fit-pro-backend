import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('available_spots')
export class AvailableSpot {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'class_id',  nullable: true  })
  classId: String;

  @Column({ name: 'available_spots', type: 'int', nullable: true })
  availableSpots?: number;
}
