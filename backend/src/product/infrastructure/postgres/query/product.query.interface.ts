export class Product {
  readonly id: string;
  readonly price: number;
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
}

export class EachItemInProduct {
  readonly id: string;
  readonly price: number;
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
}

export class Products extends Array<EachItemInProduct> {}

export interface ProductQuery {
  /**
   * @description Find Product by id
   * @param ProductId
   * @returns Promise<Product>
   */
  findById: (id: string) => Promise<Product>;

  /**
   *
   * @description Find all product in Database
   * @implements by product.query.ts file
   * @param offset
   * @param limit
   * @return Promise<Products>
   */
  findAll: (offset: number, limit: number) => Promise<Products>;
}
