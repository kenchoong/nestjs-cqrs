import { OrderEntity } from 'src/orders/instrastructure/postgres/order.entity';
import { Order } from './order';

export interface OrderRepository {
  newOrderId(): Promise<string>;

  /**
   * @description insert order to database
   */
  create: (data: Order) => Promise<OrderEntity>;

  /**
   * @description update order in db using orderId
   */
  update: (id: string, status: string) => Promise<void>;

  /**
   * @description insert Stripe PaymentIntentId into a order record
   */
  updatePaymentIntentId: (
    orderId: string,
    paymentIntentId: string,
  ) => Promise<void>;
}
