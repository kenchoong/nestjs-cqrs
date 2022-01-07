import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderInjectionModuleToken } from 'src/orders/application/order-injection-module.token';
import { OrderQuery } from 'src/orders/domain/order/order-query';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { Stripe } from 'stripe';
import { CreatePaymentIntentCommand } from './create-payment-intent.command';

@CommandHandler(CreatePaymentIntentCommand)
export class CreatePaymentIntentCommandHandler
  implements ICommandHandler<CreatePaymentIntentCommand, void>
{
  constructor(
    @Inject(OrderInjectionModuleToken.ORDER_QUERY)
    private readonly orderQuery: OrderQuery,

    private readonly configService: ConfigService,

    @Inject(OrderInjectionModuleToken.ORDER_REPO)
    private readonly orderRepo: OrderRepository,
  ) {}

  private config: Stripe.StripeConfig = null;

  //
  private stripe: Stripe = new Stripe(
    this.configService.get('STRIPE_SK_TEST'),
    this.config,
  );

  async execute(command: CreatePaymentIntentCommand): Promise<any> {
    // get the order by orderId
    const order = await this.orderQuery.findById(command.orderId);

    // create the paymentIntent in stripe
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: order.grandTotal * 100,
      currency: 'myr',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // update the paymentIntent id in orderRepo
    // Here need to make sure the id is updated to Order db
    await this.orderRepo.updatePaymentIntentId(order.id, paymentIntent.id);

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
