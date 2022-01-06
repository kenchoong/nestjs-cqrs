import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderProductFactory } from 'src/orders/domain/order-product/order-product-factory';
import { OrderProductRepository } from 'src/orders/domain/order-product/order-product-repository';
import { OrderFactory } from 'src/orders/domain/order/order-factory';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { ModuleInjectionToken } from 'src/product/application/module-injection.token';
import { ProductRepository } from 'src/product/domain/repository';
import { UserModuleInjectionToken } from 'src/users/application/user-module-injection.token';
import { UserRepository } from 'src/users/domain/repository';
import { OrderInjectionModuleToken } from '../order-injection-module.token';
import { CreateOrderCommand } from './create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand, void>
{
  constructor(
    @Inject(ModuleInjectionToken.PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,

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
    // get the user entity first
    const user = await this.userRepo.findById(command.userId);

    if (!user) throw new NotFoundException('No user is found');

    // make a blank order first
    const order = this.orderFactory.create(
      await this.orderRepo.newOrderId(),
      command.grandTotal,
      [],
      user,
    );

    const orderEntity = await this.orderRepo.create(order);

    // make a OrderProduct Object,
    // push the product, quantity and totalOfThis product in an array
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

    // If the productArray, have undefined product, throw error
    if (
      productArray.filter(
        (product) => product.properties().product === undefined,
      ).length > 0
    )
      throw new NotFoundException('One of the product is not found');

    // If not, create OrderProductEntity, AKA go in db
    const orderProductEntityArray = await Promise.all(
      productArray.map(async (product) => {
        return await this.orderProductRepo.create(product);
      }),
    );

    // update all the OrderProductEntity into the Order Create just now
    const newlyOrder = this.orderFactory.create(
      order.properties().id,
      command.grandTotal,
      orderProductEntityArray,
      user,
    );

    const newOrderEntity = await this.orderRepo.create(newlyOrder);

    return newOrderEntity;
  }
}
