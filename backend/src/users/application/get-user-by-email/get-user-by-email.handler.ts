import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmaillQueryHandler
  implements IQueryHandler<GetUserByEmailQuery, void>
{
  constructor() {}
  execute(query: GetUserByEmailQuery): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
