import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";


@Entity('class_schedules')
export class ClassSchedule {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'class_id', nullable: true})
  classId: number;
  
  @Column({ nullable: true })
  day_of_week: string;


  @Column({ nullable: true })
  time: string;

}



    


