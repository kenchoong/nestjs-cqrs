import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ModuleInjectionToken } from 'src/product/application/module-injection.token';
import { ProductFactory } from 'src/product/domain/factory';
import { ProductRepository } from 'src/product/domain/repository';
import { OrderInjectionModuleToken } from '../order-injection-module.token';
import { CreateOrderCommand } from './create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand, void>
{
  constructor(
    @Inject(ModuleInjectionToken.PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,

    private readonly productFactory: ProductFactory,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
    const product = this.productFactory.create(
      await this.productRepo.newProductId(),
      command.price,
      command.name,
      command.description,
    );

    product.validateName(command.name);
    product.validatePrice(command.price);

    await this.productRepo.create(product);

    product.commit();
  }
}
