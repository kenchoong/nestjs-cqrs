import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductQuery } from 'src/product/infrastructure/postgres/query/product.query.interface';
import { ModuleInjectionToken } from '../module-injection.token';
import { GetProductByIdQuery } from './get-product-by-id.query';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(
    @Inject(ModuleInjectionToken.PRODUCT_QUERY)
    readonly productQuery: ProductQuery,
  ) {}

  async execute(query: GetProductByIdQuery): Promise<any> {
    const product = await this.productQuery.findById(query.id);
    if (!product) throw new NotFoundException('No product with that id');

    return product;
  }
}
