import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProductsQuery } from '../impl/get-all-products.query';

@QueryHandler(GetAllProductsQuery)
export class GetAllProductsHandler
  implements IQueryHandler<GetAllProductsQuery>
{
  execute(query: GetAllProductsQuery): Promise<any> {
    console.log('Here get all product');

    return;
    // todo: execute the stuff
  }
}
