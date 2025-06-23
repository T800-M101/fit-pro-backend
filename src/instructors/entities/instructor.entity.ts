import { Class } from "../../classes/entities/class.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'instructors'})
export class Instructor {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    name: string;
    
    @Column({ nullable: false })
    photo: string;
    
    @Column({ nullable: false })
    profession: string;
    
    @Column({ nullable: true })
    facebook?: string;
    
    @Column({ nullable: true })
    twitter?: string;

}



