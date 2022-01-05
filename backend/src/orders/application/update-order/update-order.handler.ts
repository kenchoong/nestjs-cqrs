import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { OrderInjectionModuleToken } from '../order-injection-module.token';
import { UpdateOrderCommand } from './update-order.command';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderCommandHandler
  implements ICommandHandler<UpdateOrderCommand>
{
  constructor(
    @Inject(OrderInjectionModuleToken.ORDER_REPO)
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(command: UpdateOrderCommand): Promise<any> {
    return await this.orderRepo.update(command.orderId, command.orderStatus);
  }
}
