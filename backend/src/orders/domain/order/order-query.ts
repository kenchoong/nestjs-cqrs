export class EachOrderProduct {
  readonly id: string;
  readonly quantity: number;
  readonly product: any;
  readonly productTotal: number;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
}

export class OrderProducts extends Array<EachOrderProduct> {}

export class Order {
  id: string;
  grandTotal: number;
  orderProduct: OrderProducts;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface OrderQuery {
  findById: (orderId: string) => Promise<Order>;

  findOrderByPaymentIntentId: (paymentIntentId: string) => Promise<Order>;
}
