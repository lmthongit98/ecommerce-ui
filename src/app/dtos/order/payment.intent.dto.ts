export class PaymentIntentDto {

  amount: number;
  currency: string;
  receiptEmail: string;

  constructor(data: any) {
    this.amount = data.amount;
    this.currency = data.currency;
    this.receiptEmail = data.receiptEmail;
  }
}
