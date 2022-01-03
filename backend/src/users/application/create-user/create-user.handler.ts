import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from 'src/users/domain/factory';
import { UserRepository } from 'src/users/domain/repository';
import { ModuleInjectionToken } from '../module-injection.token';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, void>
{
  constructor(
    @Inject(ModuleInjectionToken.USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    private readonly userFactory: UserFactory,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const user = this.userFactory.create(
      await this.userRepo.newUserId(),
      command.username,
    );

    user.validateUsername(command.username);

    await this.userRepo.create(user);

    user.commit();

    return user;
  }
}
