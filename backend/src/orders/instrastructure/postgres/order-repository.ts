import { Order } from 'src/orders/domain/order/order';
import { OrderRepository } from 'src/orders/domain/order/order-repository';
import { getRepository } from 'typeorm';
import { OrderEntity } from './order.entity';

/**
 * @description Implementation of OrderRepository interface, here go in to db
 */
export class OrderRepoImplement implements OrderRepository {
  async newOrderId(): Promise<string> {
    const emptyOrderProduct = new OrderEntity();

    const entity = await getRepository(OrderEntity).save(emptyOrderProduct);

    return entity.id;
  }

  async create(data: Order): Promise<OrderEntity> {
    const orderEntity = this.modelToEntity(data);
    return await getRepository(OrderEntity).save(orderEntity);
  }

  async update(id: string, status: string): Promise<void> {
    await getRepository(OrderEntity).update(id, { orderStatus: status });
  }

  async updatePaymentIntentId(
    orderId: string,
    paymentIntentId: string,
  ): Promise<void> {
    await getRepository(OrderEntity).update(orderId, {
      orderPaymentIntentId: paymentIntentId,
    });
  }

  /*
  async update(orderId: string): Promise<void> {
    await getRepository(OrderEntity).update(orderId, (order = []));
  }*/

  private modelToEntity(model: Order): OrderEntity {
    const properties = model.properties();

    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }
}
