import { ICommand } from '@nestjs/cqrs';

export class CreatePaymentIntentCommand implements ICommand {
  constructor(readonly orderId: string) {}
}
