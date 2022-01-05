import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { OrderProductsEntity } from 'src/orders/instrastructure/postgres/order-product.entity';
import { OrderEntity } from 'src/orders/instrastructure/postgres/order.entity';
import { ProductProperties } from 'src/product/domain/product';
import { ProductEntity } from 'src/product/infrastructure/postgres/entities/product.entity';
import { User } from 'src/users/domain/query';
import { UserEntity } from 'src/users/infrastructure/postgres/user.entity';

import { Order, OrderImplement, OrderProperties } from './order';

export class OrderFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

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

  restructure(properties: OrderProperties): Order {
    return;
  }
}
