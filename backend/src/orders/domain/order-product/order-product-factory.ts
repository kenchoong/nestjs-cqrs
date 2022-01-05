import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { OrderEntity } from 'src/orders/instrastructure/postgres/order.entity';
import { ProductProperties } from 'src/product/domain/product';
import { ProductEntity } from 'src/product/infrastructure/postgres/entities/product.entity';
import { OrderProperties } from '../order/order';

import {
  OrderProduct,
  OrderProductImplement,
  OrderProductProperties,
} from './order-product';

export class OrderProductFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(
    id: string,
    quantity: number,
    productTotal: number,
    order: OrderEntity,
    product: ProductEntity,
  ): OrderProduct {
    return this.eventPublisher.mergeObjectContext(
      new OrderProductImplement({
        id,
        quantity,
        productTotal,
        order,
        product,
      }),
    );
  }

  restructure(properties: OrderProductProperties): OrderProduct {
    return;
  }
}
