import { IQuery } from '@nestjs/cqrs';

export class GetOrderByIdQuery implements IQuery {
  constructor(readonly orderId: string) {}
}
