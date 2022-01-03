import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import {
  Product,
  ProductImpl,
  ProductProperties,
} from 'src/product/domain/product';

export class ProductFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  /**
   * @description Create Product AggreateRoot
   * @param id
   * @param price
   * @param name
   * @param description
   * @returns Product domain object
   */
  create(
    id: string,
    price: string,
    name: string,
    description: string,
  ): Product {
    return this.eventPublisher.mergeObjectContext(
      new ProductImpl({ id, price, name, description }),
    );
  }

  /**
   *@description restructure data to Product AggreateRoot
   * @param ProductProperties
   * @returns Product Aggregate Root object
   */
  restructure(properties: ProductProperties): Product {
    return this.eventPublisher.mergeObjectContext(new ProductImpl(properties));
  }
}
