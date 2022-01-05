import { ICommand } from '@nestjs/cqrs';

export class Product {
  id: string;
}

export class OrderProduct {
  quantity: number;
  total: number;
  product: Product;
}

export class CreateOrderCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly grandTotal: number,
    readonly orderProduct: OrderProduct[],
  ) {}
}
