import { Controller, Get } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../application/create-order/create-order.command';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @Get()
  async get() {
    return await this.commandBus.execute(
      new CreateOrderCommand('dasd', 0, '1231'),
    );
  }
}
