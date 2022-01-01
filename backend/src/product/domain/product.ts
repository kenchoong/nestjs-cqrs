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
  readonly version: number;
}>;

export type ProductProperties = ProductEssestialProperties &
  Required<ProductOptionalProperties>;

export interface Product {
  properties: () => ProductProperties;
  create: () => void;
  update: () => void;
  delete: () => void;
  getAll: () => void;
  getById: () => void;
}

/*
export class ProductImpl extends AggregateRoot implements Product {
  constructor(
    productProperties: ProductEssestialProperties & ProductOptionalProperties,
  ) {
    super();
  }

  properties: () => ProductProperties;

}*/
