import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ModuleInjectionToken } from 'src/users/application/module-injection.token';
import { CreateUserCommandHandler } from './application/create-user/create-user.handler';
import { GetUserByUsernameQueryHandler } from './application/get-user-by-username/get-user-by-username.handler';
import { UserFactory } from './domain/factory';
import { UserQueryImplement } from './infrastructure/postgres/user.query';
import { UserRepositoryImplement } from './infrastructure/postgres/user.repository';
import { UsersController } from './users/users.controller';

const infrastructure = [
  {
    provide: ModuleInjectionToken.USER_QUERY,
    useClass: UserQueryImplement,
  },
  {
    provide: ModuleInjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
];

const application = [CreateUserCommandHandler, GetUserByUsernameQueryHandler];

const domain = [UserFactory];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [...application, ...infrastructure, ...domain],
})
export class UsersModule {}
