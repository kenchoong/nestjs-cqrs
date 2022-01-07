import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModuleInjectionToken } from 'src/users/application/user-module-injection.token';
import { CreateUserCommandHandler } from './application/create-user/create-user.handler';
import { GetUserByUsernameQueryHandler } from './application/get-user-by-username/get-user-by-username.handler';
import { UserFactory } from './domain/factory';
import { UserQueryImplement } from './infrastructure/postgres/user.query';
import { UserRepositoryImplement } from './infrastructure/postgres/user.repository';
import { UsersController } from './interface/users.controller';

const infrastructure = [
  {
    provide: UserModuleInjectionToken.USER_QUERY,
    useClass: UserQueryImplement,
  },
  {
    provide: UserModuleInjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
];

const application = [CreateUserCommandHandler, GetUserByUsernameQueryHandler];

const domain = [UserFactory];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [...application, ...infrastructure, ...domain],
  exports: [...application, ...infrastructure, ...domain],
})
export class UsersModule {}
