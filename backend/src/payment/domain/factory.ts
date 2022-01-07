import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { Payment, PaymentImplement } from './payment';

export class PaymentFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(orderId: string): Payment {
    return this.eventPublisher.mergeObjectContext(
      new PaymentImplement({
        orderId,
      }),
    );
  }
}
