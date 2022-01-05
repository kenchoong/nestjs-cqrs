import { AggregateRoot } from '@nestjs/cqrs';
import { OrderProductsEntity } from 'src/orders/instrastructure/postgres/order-product.entity';
import { OrderEntity } from 'src/orders/instrastructure/postgres/order.entity';
import { UserProperties } from 'src/users/domain/user';
import { UserEntity } from 'src/users/infrastructure/postgres/user.entity';
import { OrderProductProperties } from '../order-product/order-product';

export type OptionalProperties = Partial<{
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;
}>;

export type OrderEssentialProperties = Required<{
  id: string;
  grandTotal: number;
  orderProduct: OrderProductsEntity[];
  user: UserEntity;
}>;

export type OrderProperties = OrderEssentialProperties &
  Required<OptionalProperties>;

export interface Order {
  properties: () => OrderProperties;
}

export class OrderImplement extends AggregateRoot implements Order {
  readonly id: string;
  readonly grandTotal: number;
  readonly orderProduct: OrderProductsEntity[];
  readonly user: UserProperties;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;

  constructor(orderProperties: OrderEssentialProperties & OptionalProperties) {
    super();
    Object.assign(this, orderProperties);
  }
  properties(): OrderProperties {
    return {
      id: this.id,
      grandTotal: this.grandTotal,
      orderProduct: this.orderProduct,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      version: this.version,
    };
  }
}
