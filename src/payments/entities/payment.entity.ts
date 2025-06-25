import { PaymentMethod } from "src/common/payment_method.enum";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity,  ManyToMany,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'user_id', type: 'int'})
  userId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'payment_day', type: 'date' })
  paymentDay: Date;

  @Column({type: 'enum', enum: PaymentMethod})
  method: PaymentMethod;

  @Column({ length: 20, nullable: true })
  status?: string;


  @CreateDateColumn({ name: 'payment_date' })
  paymentDate: Date;

  @ManyToOne(() => User, (user) => user.payments )
  user: User;

 
}
