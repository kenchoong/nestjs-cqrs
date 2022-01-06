import { ICommand } from '@nestjs/cqrs';

export class ProcessWebhookCommand implements ICommand {
  constructor(readonly signature: string, readonly payload: Buffer) {}
}
