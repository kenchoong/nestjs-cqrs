import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  constructor(readonly name: string, readonly email: string) {}
}

export class CreateUserCommand implements ICommand {
  constructor(readonly username: string) {}
}
