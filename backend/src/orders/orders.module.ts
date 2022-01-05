import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';
import { CreateOrderCommandHandler } from './application/create-order/create-order.handler';
import { GetOrderByIdHandler } from './application/get-order-by-id/get-order-by-id.handler';
import { OrderInjectionModuleToken } from './application/order-injection-module.token';
import { OrderProductFactory } from './domain/order-product/order-product-factory';
import { OrderFactory } from './domain/order/order-factory';
import { OrderProductRepositoryImplement } from './instrastructure/postgres/order-product.repository';
import { OrderRepoImplement } from './instrastructure/postgres/order-repository';
import { OrderQueryImplement } from './instrastructure/postgres/order.query';
import { OrdersController } from './interface/orders.controller';
import { StripeModule } from 'nestjs-stripe';

const infrastructure: Provider[] = [
  {
    provide: OrderInjectionModuleToken.ORDER_PRODUCT_REPO,
    useClass: OrderProductRepositoryImplement,
  },
  {
    provide: OrderInjectionModuleToken.ORDER_REPO,
    useClass: OrderRepoImplement,
  },
  {
    provide: OrderInjectionModuleToken.ORDER_QUERY,
    useClass: OrderQueryImplement,
  },
];

const application = [CreateOrderCommandHandler, GetOrderByIdHandler];

const domain = [OrderProductFactory, OrderFactory];

@Module({
  imports: [CqrsModule, UsersModule, ProductModule],
  controllers: [OrdersController],
  providers: [...application, ...infrastructure, ...domain],
})
export class OrdersModule {}
