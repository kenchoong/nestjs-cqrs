import { Inject, NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserQuery } from 'src/users/domain/query';
import { ModuleInjectionToken } from '../module-injection.token';
import { GetUserByUsernameQuery } from './get-user-by-username.query';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameQueryHandler
  implements IQueryHandler<GetUserByUsernameQuery, void>
{
  constructor(
    @Inject(ModuleInjectionToken.USER_QUERY)
    private readonly userQuery: UserQuery,
  ) {}

  async execute(query: GetUserByUsernameQuery): Promise<any> {
    const user = await this.userQuery.findByUsername(query.username);

    if (!user) throw new NotFoundException('No user with that username');

    return user;
  }
}
