import { PaymentMethod } from "src/common/payment_method.enum";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity,  ManyToMany,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'payment_day', type: 'date' })
  paymentDay: Date;

  @Column({type: 'enum', enum: PaymentMethod, default: PaymentMethod.CARD})
  method: PaymentMethod;

  @Column({ length: 20, nullable: true })
  status?: string;

  @CreateDateColumn({ name: 'payment_date' })
  paymentDate: Date;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId?: string;

  @Column({ type: 'int', default: 1 }) 
  durationInMonths: number;

  @Column({ type: 'date', name: 'due_date', nullable: false })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.payments )
  user: User;
}
