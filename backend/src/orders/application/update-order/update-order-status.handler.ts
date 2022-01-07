import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { OrderInjectionModuleToken } from '../order-injection-module.token';
import { UpdateOrderStatusCommand } from './update-order-status.command';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderCommandHandler
  implements ICommandHandler<UpdateOrderStatusCommand>
{
  constructor(
    @Inject(OrderInjectionModuleToken.ORDER_REPO)
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(command: UpdateOrderStatusCommand): Promise<any> {
    return await this.orderRepo.update(command.orderId, command.orderStatus);
  }
}
