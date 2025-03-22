export class Refund {
  constructor(
    private refundAmount: number,
    private ticketPurchaseAmount: number
  ) {}

  amount() {
    return (this.refundAmount / 100) * this.ticketPurchaseAmount;
  }
}
