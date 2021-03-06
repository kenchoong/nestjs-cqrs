import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { OrderProductsEntity } from 'src/orders/instrastructure/postgres/order-product.entity';
import { UserEntity } from 'src/users/infrastructure/postgres/user.entity';

import { Order, OrderImplement } from './order';

export class OrderFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  /**
   * @description OrderFactory generate Order using necessary details
   * @param id
   * @param grandTotal
   * @param orderProduct
   * @param user
   * @returns Order domain
   */
  create(
    id: string,
    grandTotal: number,
    orderProduct: OrderProductsEntity[],
    user: UserEntity,
  ): Order {
    return this.eventPublisher.mergeObjectContext(
      new OrderImplement({
        id,
        grandTotal,
        orderProduct,
        user,
      }),
    );
  }
}
