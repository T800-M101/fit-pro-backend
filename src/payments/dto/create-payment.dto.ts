export class CreatePaymentDto {
  id: number;
  date: Date;
  amount: number;
  method: string;
  status: string;
  transactionId?: string;
}
