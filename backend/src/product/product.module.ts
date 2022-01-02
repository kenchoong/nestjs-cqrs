import { Module, Provider } from '@nestjs/common';
import { ProductController } from './interface/product.controller';
import { CqrsModule } from '@nestjs/cqrs';

import { ModuleInjectionToken } from './application/module-injection.token';
import { ProductQueryImplement } from './infrastructure/postgres/query/product.query';
import { ProductRepoImplement } from './infrastructure/postgres/repositories/product.repository';

import { CreateProductHandler } from './application/create-product/create-product.handler';
import { GetProductByIdHandler } from './application/get-product-by-id/get-product-by-id.handler';
import { GetAllProductsHandler } from './application/get-all-products/get-all-products.handler';
import { ProductFactory } from './domain/factory';

const infrasturucture: Provider[] = [
  {
    provide: ModuleInjectionToken.PRODUCT_QUERY,
    useClass: ProductQueryImplement,
  },
  {
    provide: ModuleInjectionToken.PRODUCT_REPOSITORY,
    useClass: ProductRepoImplement,
  },
];

const application = [
  GetAllProductsHandler,
  GetProductByIdHandler,
  CreateProductHandler,
];

const domain = [ProductFactory];

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [...application, ...infrasturucture, ...domain],
})
export class ProductModule {}
