import { Injectable } from '@nestjs/common';
import { Order, OrderQuery } from 'src/orders/domain/order/order-query';
import { getRepository } from 'typeorm';
import { OrderEntity } from './order.entity';

/**
 * @description implementation of OrderQuery interface, get data from DB
 */
@Injectable()
export class OrderQueryImplement implements OrderQuery {
  async findById(orderId: string): Promise<undefined | Order> {
    return this.convertOrderFromEntity(
      await getRepository(OrderEntity).findOne({
        where: { id: orderId },
        relations: ['user', 'orderProduct', 'orderProduct.product'],
      }),
    );
  }

  async findOrderByPaymentIntentId(paymentIntentId: string): Promise<Order> {
    return this.convertOrderFromEntity(
      await getRepository(OrderEntity).findOne({
        where: { orderPaymentIntentId: paymentIntentId },
      }),
    );
  }

  /**
   * @description Coverts the response from DB to an object we want
   * @param OrderEntity
   * @returns
   */
  private convertOrderFromEntity(entity?: OrderEntity): Order | undefined {
    return entity
      ? { ...entity, createdAt: entity.createdAt, updatedAt: entity.updatedAt }
      : undefined;
  }
}
