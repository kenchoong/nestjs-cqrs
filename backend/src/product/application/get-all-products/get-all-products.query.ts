import { IQuery } from '@nestjs/cqrs';

export class GetAllProductsQuery implements IQuery {
  constructor(readonly offset: number, readonly limit: number) {}
}
