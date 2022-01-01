import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductByIdQuery } from '../impl/get-product-by-id.query';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  execute(query: GetProductByIdQuery): Promise<any> {
    console.log('productId' + query.id);

    // TODO: make it to DB
    return;
  }
}
