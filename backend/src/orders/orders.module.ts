import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/infrastructure/postgres/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { CreateOrderCommandHandler } from './application/create-order/create-order.handler';
import { OrdersController } from './interface/orders.controller';

const application = [CreateOrderCommandHandler];

@Module({
  imports: [CqrsModule, ProductModule],
  controllers: [OrdersController],
  providers: [...application],
})
export class OrdersModule {}
