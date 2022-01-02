import { AggregateRoot } from '@nestjs/cqrs';

export type ProductEssestialProperties = Required<{
  readonly id: string;
  readonly price: string;
  readonly name: string;
}>;

export type ProductOptionalProperties = Partial<{
  readonly description: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;
}>;

export type ProductProperties = ProductEssestialProperties &
  Required<ProductOptionalProperties>;

export interface Product {
  properties: () => ProductProperties;
  commit: () => void;
}

export class ProductImpl extends AggregateRoot implements Product {
  readonly id: string;
  readonly price: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;

  constructor(
    productProperties: ProductEssestialProperties & ProductOptionalProperties,
  ) {
    super();
    Object.assign(this, productProperties);
  }

  properties(): ProductProperties {
    return {
      id: this.id,
      price: this.price,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.version,
      deletedAt: this.deletedAt,
    };
  }

  // Here will be some business logic about product object
  // Not database operation
  // but a verb, a product operation that need to manipulate ProductProperties
  // Right now still dont have yet
}
