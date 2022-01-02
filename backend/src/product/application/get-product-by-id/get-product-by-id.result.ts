import { IQueryResult } from '@nestjs/cqrs';

export class GetProductByIdResult implements IQueryResult {
  readonly id: string;
  readonly price: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
}
