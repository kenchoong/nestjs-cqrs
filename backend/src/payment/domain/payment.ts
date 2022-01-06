import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentEvent } from 'src/orders/event/payment-event/payment-event';
import { PaymentEventHandler } from 'src/orders/event/payment-event/payment-event.handler';

export type PaymentProperties = Required<{
  orderId: string;
}>;

export interface Payment {
  properties: () => PaymentProperties;
  succeed: () => void;
  failed: () => void;
  commit: () => void;
}

export class PaymentImplement extends AggregateRoot implements Payment {
  orderId: string;

  constructor(paymentProperties: PaymentProperties) {
    super();
    Object.assign(this, paymentProperties);
  }

  properties(): Required<{ orderId: string }> {
    return {
      orderId: this.orderId,
    };
  }

  succeed(): void {
    this.apply(
      Object.assign(new PaymentEvent(), {
        orderId: this.orderId,
        orderStatus: 'PAYMENT_SUCCEED',
      }),
    );
  }

  failed(): void {
    this.apply(
      Object.assign(new PaymentEvent(), {
        orderId: this.orderId,
        orderStatus: 'PAYMENT_FAILED',
      }),
    );
  }
}
