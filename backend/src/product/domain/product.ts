import { UnprocessableEntityException } from '@nestjs/common';
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
  /**
   * @description: This will return all the properties of a product
   */
  properties: () => ProductProperties;
  /**
   * @description: Validate the name before insert to db
   * @param: The name that receive from request
   */
  validateName: (name: string) => void;

  /**
   * @description: Validate the price before insert to db
   * @param: The price receive from request
   */
  validatePrice: (price: string) => void;

  /**
   * @description: Nestjs CQRS commit the command
   * @refer https://docs.nestjs.com/recipes/cqrs#events
   */
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
  // Some action you need to perform before save to DB

  validateName(name: string): void {
    if (name === '') {
      throw new UnprocessableEntityException('Name is empty');
    }
  }
  validatePrice(price: string): void {
    if (price === '') {
      throw new UnprocessableEntityException('Price is empty');
    }
  }
}
