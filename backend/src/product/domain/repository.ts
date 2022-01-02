import { Product } from './product';

/**
 * @description: Interface to interact with database
 * @implementation product.respository.ts
 */
export interface ProductRepository {
  /**
   * @description: Save an empty product into db, just to get a newly created ID, to later save the product data in Create method
   * @refer : /domain/factory.ts
   */
  newProductId: () => Promise<string>;

  /**
   *@description: use the newId created, and save Product data into that ID
   *@param Product domain model AKA /domain/product.ts
   *
   */
  create: (data: Product) => Promise<void>;
}
