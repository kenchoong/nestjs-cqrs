import { Injectable } from '@nestjs/common';
import {
  Order,
  OrderProducts,
  OrderQuery,
} from 'src/orders/domain/order/order-query';
import { User } from 'src/users/domain/query';
import { getRepository } from 'typeorm';
import { OrderProductsEntity } from './order-product.entity';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderQueryImplement implements OrderQuery {
  /*
  async findOrderProduct(orderId: string): Promise<OrderProducts> {
    return this.convertOrderProductsFromEntity(
      await getRepository(OrderEntity).find({ relations: ['orderProducts'] }),
    );
  }

  async findOrderUser(): Promise<User> {
    return this.convertUserFromEntity(
      await getRepository(OrderEntity).find({ relations: ['user'] }),
    );
  }*/

  async findById(orderId: string): Promise<undefined | Order> {
    return this.convertOrderFromEntity(
      await getRepository(OrderEntity).findOne({
        where: { id: orderId },
        relations: ['user', 'orderProduct'],
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

  private convertOrderProductsFromEntity(
    entities: OrderProductsEntity[],
  ): OrderProducts {
    return entities.map((entity) => ({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }

  private convertUserFromEntity(entity?: User): User | undefined {
    return entity ? { ...entity, createdAt: entity.createdAt } : undefined;
  }
}
