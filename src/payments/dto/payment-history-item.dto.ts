import { Expose } from 'class-transformer';

export class PaymentHistoryItemDto {
  @Expose() id: number;
  @Expose() date: Date;             
  @Expose() amount: number;
  @Expose() method: string;
  @Expose() status: string;
  @Expose() transactionId: string | null;
}