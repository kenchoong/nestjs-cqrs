import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderInjectionModuleToken } from 'src/orders/application/order-injection-module.token';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { PaymentEvent } from './payment-event';

@EventsHandler(PaymentEvent)
export class PaymentEventHandler implements IEventHandler<PaymentEvent> {
  constructor(
    @Inject(OrderInjectionModuleToken.ORDER_REPO)
    private readonly orderRepo: OrderRepository,
  ) {}

  async handle(event: PaymentEvent) {
    await this.orderRepo.update(event.orderId, event.orderStatus);
  }
}
