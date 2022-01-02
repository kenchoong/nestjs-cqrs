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

  create(id: string, price: string, name: string): Product {
    return this.eventPublisher.mergeObjectContext(
      new ProductImpl({ id, price, name }),
    );
  }

  restructure(properties: ProductProperties): Product {
    return this.eventPublisher.mergeObjectContext(new ProductImpl(properties));
  }
}
