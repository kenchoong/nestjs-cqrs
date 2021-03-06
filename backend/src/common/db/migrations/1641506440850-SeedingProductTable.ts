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

    await queryRunner.manager.save(
      queryRunner.manager.create<ProductEntity>(ProductEntity, {
        price: 201.8,
        name: 'Nasi Lemak 1.0',
        description: 'Mesti kena makan',
      }),
    );

    await queryRunner.manager.save(
      queryRunner.manager.create<ProductEntity>(ProductEntity, {
        price: 201.8,
        name: 'Mee Goreng',
        description: 'Macam mana pun kena makan',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query(`DELETE * FROM ProductEntity`);
  }
}
