import { Product } from './product';

export interface ProductRepository {
  newIdProductId: () => Promise<string>;
  create(product: Product): () => Promise<void>;
  findProductById: (id: string) => Promise<Product>;
  findAllProducts: () => Promise<Product[]>;
}
