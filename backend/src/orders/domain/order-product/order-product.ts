import { AggregateRoot } from '@nestjs/cqrs';
import { OrderEntity } from 'src/orders/instrastructure/postgres/order.entity';
import { ProductEntity } from 'src/product/infrastructure/postgres/entities/product.entity';
import { OptionalProperties } from '../order/order';

export type OrderProductEssentialProperties = {
  readonly id: string;
  readonly quantity: number;
  readonly productTotal: number;
  readonly order: OrderEntity;
  readonly product: ProductEntity;
};

export type OrderProductProperties = OrderProductEssentialProperties &
  Required<OptionalProperties>;

export interface OrderProduct {
  properties: () => OrderProductProperties;
  commit: () => void;
}

export class OrderProductImplement
  extends AggregateRoot
  implements OrderProduct
{
  readonly id: string;
  readonly quantity: number;
  readonly productTotal: number;
  readonly order: OrderEntity;
  readonly product: ProductEntity;

  readonly orderStatus: string | null;
  readonly updatedAt: Date | null;
  readonly createdAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;

  constructor(
    orderProductProperties: OrderProductEssentialProperties &
      OptionalProperties,
  ) {
    super();
    Object.assign(this, orderProductProperties);
  }

  /**Return properties of a product */
  properties(): OrderProductProperties {
    return {
      id: this.id,
      quantity: this.quantity,
      productTotal: this.productTotal,
      order: this.order,
      product: this.product,

      orderStatus: this.orderStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      version: this.version,
    };
  }
}
