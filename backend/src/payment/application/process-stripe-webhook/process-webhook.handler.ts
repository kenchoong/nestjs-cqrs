import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderInjectionModuleToken } from 'src/orders/application/order-injection-module.token';
import { OrderQuery } from 'src/orders/domain/order/order-query';
import { PaymentFactory } from 'src/payment/domain/factory';
import Stripe from 'stripe';
import { ProcessWebhookCommand } from './process-webhook.command';

@CommandHandler(ProcessWebhookCommand)
export class ProcessWebhookCommandHandler
  implements ICommandHandler<ProcessWebhookCommand, void>
{
  constructor(
    @Inject(OrderInjectionModuleToken.ORDER_QUERY)
    private readonly orderQuery: OrderQuery,

    private readonly configService: ConfigService,

    private readonly paymentFactory: PaymentFactory,
  ) {}

  private config: Stripe.StripeConfig = null;

  private stripe: Stripe = new Stripe(
    this.configService.get('STRIPE_SK_TEST'),
    this.config,
  );

  async execute(command: ProcessWebhookCommand): Promise<any> {
    const event = this.stripe.webhooks.constructEvent(
      command.payload,
      command.signature,
      this.configService.get('STRIPE_WEBHOOK_SECRET'),
    );

    const paymentIntent: any = event.data.object;
    const order = await this.orderQuery.findOrderByPaymentIntentId(
      paymentIntent.id,
    );

    if (!order) return;

    const payment = this.paymentFactory.create(order.id);

    switch (event.type) {
      case 'payment_intent.succeeded':
        payment.succeed();
        payment.commit();
        break;
      case 'payment_intent.failed':
        payment.failed();
        payment.commit();
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
