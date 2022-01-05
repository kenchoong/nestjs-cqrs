import { OrderEntity } from 'src/orders/instrastructure/postgres/order.entity';
import { Order } from './order';

export interface OrderRepository {
  newOrderId(): Promise<string>;

  create: (data: Order) => Promise<OrderEntity>;

  update: (id: string, status: string) => Promise<void>;
}
