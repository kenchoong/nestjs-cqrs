import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrderQuery } from 'src/orders/domain/order/order-query';
import { OrderInjectionModuleToken } from '../order-injection-module.token';
import { GetOrderByIdQuery } from './get-order-by-id.query';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(
    @Inject(OrderInjectionModuleToken.ORDER_QUERY)
    readonly orderQuery: OrderQuery,
  ) {}

  async execute(query: GetOrderByIdQuery): Promise<any> {
    const order = await this.orderQuery.findById(query.orderId);

    if (!order) throw new NotFoundException('Order with given id not found');

    return order;
  }
}
