import { AggregateRoot } from '@nestjs/cqrs';
import { ProductProperties } from 'src/product/domain/product';
import { UserProperties } from 'src/users/domain/user';

export type OrderProductEssentialProperties = Required<{
  readonly id: string;
  readonly quantity: number;
  readonly productTotal: number;
  readonly order: OrderProperties;
  readonly product: ProductProperties[];
}>;

export type OrderProductProperties = OrderProductEssentialProperties &
  Required<OptionalProperties>;

export type OptionalProperties = Partial<{
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;
}>;

export type OrderEssentialProperties = Required<{
  id: string;
  grandTotal: number;
  orderProduct: OrderProductProperties[];
  user: UserProperties;
}>;

export type OrderProperties = OrderEssentialProperties &
  Required<OptionalProperties>;

export interface Order {
  properties: () => OrderProperties;
}

export class OrderImplement extends AggregateRoot implements Order {
  id: string;
  grandTotal: number;
  orderProduct: OrderProductProperties[];
  user: UserProperties;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;

  constructor(orderProperties: OrderProperties & OptionalProperties) {
    super();
    Object.assign(this, orderProperties);
  }
  properties: () => OrderProperties;
}
