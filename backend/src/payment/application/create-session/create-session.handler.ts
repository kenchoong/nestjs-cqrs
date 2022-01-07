import { Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderInjectionModuleToken } from 'src/orders/application/order-injection-module.token';
import { OrderQuery } from 'src/orders/domain/order/order-query';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { Stripe } from 'stripe';
import { CreateSessionCommand } from './create-session.command';

@CommandHandler(CreateSessionCommand)
export class CreateSessionCommandHandler
  implements ICommandHandler<CreateSessionCommand, void>
{
  constructor(
    @Inject(OrderInjectionModuleToken.ORDER_QUERY)
    private readonly orderRepo: OrderQuery,

    private readonly configService: ConfigService,
  ) {}

  private config: Stripe.StripeConfig = null;

  //
  private stripe: Stripe = new Stripe(
    this.configService.get('STRIPE_SK_TEST'),
    this.config,
  );

  async execute(command: CreateSessionCommand): Promise<any> {
    const order = await this.orderRepo.findById(command.orderId);

    if (!order) throw new NotFoundException('Order with given id not found');

    console.log(order.orderProduct);

    const line_items = [];
    order.orderProduct.map((itemInProduct) => {
      console.log(itemInProduct);

      line_items.push({
        price_data: {
          currency: 'myr',
          product_data: {
            name: itemInProduct.product.name,
          },
          unit_amount: itemInProduct.product.price * 100,
        },

        quantity: itemInProduct.quantity,
      });
    });

    console.log(line_items);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout/success',
      cancel_url: 'http://localhost:3000/checkout/cancel',
    });

    return {
      url: session.url,
    };
  }
}
