import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentEvent } from 'src/orders/event/payment-event/payment-event';

export type PaymentProperties = Required<{
  orderId: string;
}>;

export interface Payment {
  /**
   * @description Return all properties of a Payment
   */
  properties: () => PaymentProperties;
  /**
   * @description Trigger order success event
   */
  succeed: () => void;

  /**
   * @description Trigger order failed event
   */
  failed: () => void;

  /**
   * @description Commit of the AggreateRoot of Nestjs
   */
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

  /**
   * @description trigger event to Order module
   * @refer https://docs.nestjs.com/recipes/cqrs#events
   */
  succeed(): void {
    this.apply(
      Object.assign(new PaymentEvent(), {
        orderId: this.orderId,
        orderStatus: 'PAYMENT_SUCCEED',
      }),
    );
  }

  /**
   * @description trigger event to Order module
   * @refer https://docs.nestjs.com/recipes/cqrs#events
   */
  failed(): void {
    this.apply(
      Object.assign(new PaymentEvent(), {
        orderId: this.orderId,
        orderStatus: 'PAYMENT_FAILED',
      }),
    );
  }
}
