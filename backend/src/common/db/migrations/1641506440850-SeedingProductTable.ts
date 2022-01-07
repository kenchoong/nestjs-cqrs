import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductEntity } from 'src/product/infrastructure/postgres/entities/product.entity';

export class SeedingProductTable1641506440850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<ProductEntity>(ProductEntity, {
        price: 9.8,
        name: 'Nasi Lemak 2.0',
        description: 'Tak makan rugi o',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query(`DELETE * FROM ProductEntity`);
  }
}
