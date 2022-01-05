import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderProductImplement } from 'src/orders/domain/order-product/order-product';
import { OrderProductFactory } from 'src/orders/domain/order-product/order-product-factory';
import { OrderProductRepository } from 'src/orders/domain/order-product/order-product-repository';
import { OrderFactory } from 'src/orders/domain/order/order-factory';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { OrderEntity } from 'src/orders/instrastructure/postgres/order.entity';
import { ModuleInjectionToken } from 'src/product/application/module-injection.token';
import { ProductFactory } from 'src/product/domain/factory';
import { ProductRepository } from 'src/product/domain/repository';
import { ProductQuery } from 'src/product/infrastructure/postgres/query/product.query.interface';
import { UserModuleInjectionToken } from 'src/users/application/user-module-injection.token';
import { UserRepository } from 'src/users/domain/repository';
import { OrderInjectionModuleToken } from '../order-injection-module.token';
import { CreateOrderCommand, OrderProduct } from './create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand, void>
{
  constructor(
    @Inject(ModuleInjectionToken.PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,

    @Inject(ModuleInjectionToken.PRODUCT_QUERY)
    private readonly productQuery: ProductQuery,
    private readonly productFactory: ProductFactory,

    @Inject(OrderInjectionModuleToken.ORDER_PRODUCT_REPO)
    private readonly orderProductRepo: OrderProductRepository,

    @Inject(UserModuleInjectionToken.USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    private readonly orderProductFactory: OrderProductFactory,

    @Inject(OrderInjectionModuleToken.ORDER_REPO)
    private readonly orderRepo: OrderRepository,

    private readonly orderFactory: OrderFactory,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
    console.log('command handler', command.orderProduct);

    // get the user entity first
    const user = await this.userRepo.findById(command.userId);

    if (!user) throw new NotFoundException('No user is found');

    const order = this.orderFactory.create(
      await this.orderRepo.newOrderId(),
      command.grandTotal,
      [],
      user,
    );

    const orderEntity = await this.orderRepo.create(order);
    console.log('original orderid', orderEntity);

    const productArray = await Promise.all(
      command.orderProduct.map(async (orderProductData) => {
        const product = await this.productRepo.findById(
          orderProductData.product.id,
        );

        const orderProduct = this.orderProductFactory.create(
          await this.orderProductRepo.newOrderProductId(),
          orderProductData.quantity,
          orderProductData.total,
          orderEntity,
          product,
        );

        return orderProduct;
      }),
    );

    if (
      productArray.filter(
        (product) => product.properties().product === undefined,
      ).length > 0
    )
      throw new NotFoundException('One of the product is not found');

    const orderProductEntityArray = await Promise.all(
      productArray.map(async (product) => {
        return await this.orderProductRepo.create(product);
      }),
    );

    //console.log(orderProductEntityArray);

    const newlyOrder = this.orderFactory.create(
      order.properties().id,
      command.grandTotal,
      orderProductEntityArray,
      user,
    );

    const newOrderEntity = await this.orderRepo.create(newlyOrder);

    console.log('updatedOrderId', newOrderEntity);

    return newOrderEntity;
  }
}
