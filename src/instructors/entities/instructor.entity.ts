import { Class } from "src/classes/entities/class.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'instructors'})
export class Instructor {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    name: string;
    
    @Column({ nullable: false })
    photo: string;

    @Column({type: 'text', nullable: false, default: ''})
    bio: string;
    
    @Column({type: 'text', nullable: false, default:'' })
    specialty: string;
    
    @Column({ nullable: true })
    facebook?: string;
    
    @Column({ nullable: true })
    twitter?: string;

   @OneToMany(() => Class, cls => cls.instructor)
  classes: Class[];

}


