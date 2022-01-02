import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductQuery } from 'src/product/infrastructure/postgres/query/product.query.interface';
import { ModuleInjectionToken } from '../module-injection.token';
import { GetAllProductsQuery } from './get-all-products.query';

@QueryHandler(GetAllProductsQuery)
export class GetAllProductsHandler
  implements IQueryHandler<GetAllProductsQuery>
{
  constructor(
    @Inject(ModuleInjectionToken.PRODUCT_QUERY)
    readonly productQuery: ProductQuery,
  ) {}

  async execute(query: GetAllProductsQuery): Promise<any> {
    const products = await this.productQuery.findAll(query.offset, query.limit);
    if (!products) throw new NotFoundException('No products');

    return products;
  }
}
