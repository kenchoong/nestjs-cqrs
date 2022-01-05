import { OrderProductsEntity } from 'src/orders/instrastructure/postgres/order-product.entity';
import { OrderProduct } from './order-product';

export interface OrderProductRepository {
  newOrderProductId: () => Promise<string>;

  create: (data: OrderProduct) => Promise<OrderProductsEntity>;
}
