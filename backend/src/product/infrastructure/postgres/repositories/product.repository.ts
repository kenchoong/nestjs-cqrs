import { Inject } from '@nestjs/common';
import { Product } from 'src/product/domain/product';
import { ProductRepository } from 'src/product/domain/repository';
import { getRepository, In } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductFactory } from '../../../domain/factory';

/**
 *
 * Here interact with Database
 * return the stuff in domain
 * Need to interact Entity
 */
export class ProductRepoImplement implements ProductRepository {
  constructor(
    @Inject(ProductFactory) private readonly productFactory: ProductFactory,
  ) {}

  /**
   * @description Create a new product Id, to be use to create a new product
   * @returns new ProductId
   */
  async newProductId(): Promise<string> {
    const emptyProduct = new ProductEntity();
    const entity = await getRepository(ProductEntity).save(emptyProduct);
    return entity.id;
  }

  /**
   *@description Create product in database
   * @param data: Product
   */
  async create(data: Product): Promise<void> {
    const entities = this.modelToEntity(data);
    await getRepository(ProductEntity).save(entities);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const entity = await getRepository(ProductEntity).findOne({ id });
    return entity;
  }

  async findEntityByIds(ids: string[]): Promise<ProductEntity[] | null> {
    const entities = await getRepository(ProductEntity).find({ id: In(ids) });
    return entities;
  }

  /**
   * @description: Convert from Domain object properties to Database Entity
   * @param model :Product
   * @returns a model to be save
   */
  private modelToEntity(model: Product): ProductEntity {
    const properties = model.properties();
    console.log(properties);

    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }

  /**
   * @description Convert Database Entity to Domain object model
   * @param ProductEntity
   * @returns Domain object properties to return back in response
   */
  private entityToModel(entity: ProductEntity): Product {
    return this.productFactory.restructure({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
