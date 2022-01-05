import { OrderProduct } from 'src/orders/domain/order-product/order-product';
import { OrderProductRepository } from 'src/orders/domain/order-product/order-product-repository';
import { getRepository, getManager } from 'typeorm';
import { OrderProductsEntity } from './order-product.entity';

export class OrderProductRepositoryImplement implements OrderProductRepository {
  async newOrderProductId(): Promise<string> {
    const emptyOrderProduct = new OrderProductsEntity();

    const entity = await getRepository(OrderProductsEntity).save(
      emptyOrderProduct,
    );

    return entity.id;
  }
  async create(data: OrderProduct): Promise<OrderProductsEntity> {
    const orderProductEntity = this.modelToEntity(data);
    return await getRepository(OrderProductsEntity).save(orderProductEntity);
    //await getManager().save(orderProductEntity);
  }

  private modelToEntity(model: OrderProduct): OrderProductsEntity {
    const properties = model.properties();

    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }
}
