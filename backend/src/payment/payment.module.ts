import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersModule } from 'src/orders/orders.module';
import { CreatePaymentIntentCommandHandler } from './application/create-payment-intent/create-payment-intent.handler';
import { CreateSessionCommandHandler } from './application/create-session/create-session.handler';
import { PaymentController } from './interface/payment.controller';
import { ProcessWebhookCommandHandler } from './application/process-stripe-webhook/process-webhook.handler';
import { PaymentFactory } from './domain/factory';

const application = [
  CreateSessionCommandHandler,
  CreatePaymentIntentCommandHandler,
  ProcessWebhookCommandHandler,
];

const domain = [PaymentFactory];

@Module({
  imports: [ConfigModule, OrdersModule, CqrsModule],
  controllers: [PaymentController],
  providers: [...application, ...domain],
})
export class PaymentModule {}
