import { ICommand } from '@nestjs/cqrs';

export class UpdateOrderCommand implements ICommand {
  constructor(readonly orderId: string, readonly orderStatus: string) {}
}
