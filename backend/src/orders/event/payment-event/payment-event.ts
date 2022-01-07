import { IEvent } from '@nestjs/cqrs';
import { PaymentProperties } from 'src/payment/domain/payment';

export class PaymentEvent implements IEvent, PaymentProperties {
  orderId: string;
  orderStatus: string;
}
