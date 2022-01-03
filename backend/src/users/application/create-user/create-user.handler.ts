import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, void>
{
  constructor() {}
  execute(command: CreateUserCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
