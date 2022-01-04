import { ICommand } from '@nestjs/cqrs';

export class CreateOrderCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly price: number,
    readonly description: string,
  ) {}
}
