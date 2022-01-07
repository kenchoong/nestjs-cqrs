import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderCommand } from '../application/create-order/create-order.command';
import { GetOrderByIdQuery } from '../application/get-order-by-id/get-order-by-id.query';
import { CreateOrderDto } from './dto/request/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':orderId')
  @ApiNotFoundResponse({
    description: 'not found',
  })
  async get(@Param('orderId') orderId: string) {
    return this.queryBus.execute(new GetOrderByIdQuery(orderId));
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Order Created',
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  async create(@Body() body: CreateOrderDto) {
    return await this.commandBus.execute(
      new CreateOrderCommand(body.userId, body.grandTotal, body.orderProduct),
    );
  }
}
