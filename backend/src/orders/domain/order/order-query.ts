import { User } from 'src/users/domain/query';

export class EachOrderProduct {
  readonly id: string;
  readonly quantity: number;
  readonly productTotal: number;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
}

export class OrderProducts extends Array<EachOrderProduct> {}

export class Order {
  id: string;
  grandTotal: number;
  //orderProduct: OrderProducts;
  //user: User;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface OrderQuery {
  findById: (orderId: string) => Promise<Order>;
  /*
  findOrderProduct: (orderId: string) => Promise<OrderProducts>;

  findOrderUser: () => Promise<User>;*/
}
