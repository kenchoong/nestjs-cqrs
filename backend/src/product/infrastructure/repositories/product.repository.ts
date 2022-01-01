import { Product } from 'src/product/domain/product';
import { ProductRepository } from 'src/product/domain/repository';

/**
 *
 * Here interact with Database
 * return the stuff in domain
 * Need to interact Entity
 */
export class ProductRepoImpl implements ProductRepository {
  newIdProductId(): Promise<string> {
    return;
  }

  create(product: Product): () => Promise<void> {
    throw new Error('Method not implemented.');
  }

  findProductById(id: string): Promise<Product> {
    return;
  }

  findAllProducts(): Promise<Product[]> {
    return;
  }
}
