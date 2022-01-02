import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductFactory } from 'src/product/domain/factory';
import { ProductRepository } from 'src/product/domain/repository';
import { ModuleInjectionToken } from '../module-injection.token';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, void>
{
  constructor(
    @Inject(ModuleInjectionToken.PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,

    private readonly productFactory: ProductFactory,
  ) {}

  async execute(command: CreateProductCommand): Promise<any> {
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
