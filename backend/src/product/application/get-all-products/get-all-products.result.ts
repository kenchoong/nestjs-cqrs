import { IQueryResult } from '@nestjs/cqrs';

export class EachProductResult {
  readonly id: string;
  readonly price: string;
  readonly name: string;
  readonly description: string;
}

export class GetAllProductResult
  extends Array<EachProductResult>
  implements IQueryResult {}
