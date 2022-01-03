import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Product, ProductQuery, Products } from './product.query.interface';

@Injectable()
export class ProductQueryImplement implements ProductQuery {
  /**
   * @description get product by Id
   * @param ProductId
   * @returns Promise<undefined | Product>
   */
  async findById(id: string): Promise<undefined | Product> {
    return this.convertProductFromEntity(
      await getRepository(ProductEntity).findOne(id),
    );
  }

  /**
   * @description Get all products from database
   * @param No params
   * @returns Promise<Products>
   *
   */
  async findAll(): Promise<Products> {
    return this.convertProductsFromEntity(
      await getRepository(ProductEntity).find(),
    );
  }

  /**
   * @description Coverts the response from DB to an object we want
   * @param ProductEntity
   * @returns
   */
  private convertProductFromEntity(
    entity?: ProductEntity,
  ): Product | undefined {
    return entity
      ? { ...entity, createdAt: entity.createdAt, updatedAt: entity.updatedAt }
      : undefined;
  }

  /**
   * @description Converts the response from DB
   * @param ProductEntity[]
   * @returns An array of Product object.
   */
  private convertProductsFromEntity(entities: ProductEntity[]): Products {
    return entities.map((entity) => ({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }
}
