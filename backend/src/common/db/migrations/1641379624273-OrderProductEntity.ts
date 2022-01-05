import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderProductEntity1641379624273 implements MigrationInterface {
  name = 'OrderProductEntity1641379624273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP CONSTRAINT "FK_4a2cf872a9121c9e2bc865bd97f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP COLUMN "orderProductId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD "orderId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD "productId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD CONSTRAINT "FK_68aeee1ee8c57b43eac20a2e562" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD CONSTRAINT "FK_118a4bfaaeea2b9ccec46cb873e" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP CONSTRAINT "FK_118a4bfaaeea2b9ccec46cb873e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP CONSTRAINT "FK_68aeee1ee8c57b43eac20a2e562"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP COLUMN "orderId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD "orderProductId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD CONSTRAINT "FK_4a2cf872a9121c9e2bc865bd97f" FOREIGN KEY ("orderProductId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
