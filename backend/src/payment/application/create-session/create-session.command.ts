import { ICommand } from '@nestjs/cqrs';

export class CreateSessionCommand implements ICommand {
  constructor(readonly orderId: string) {}
}
