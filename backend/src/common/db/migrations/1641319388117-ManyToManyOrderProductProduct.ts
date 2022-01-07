import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToManyOrderProductProduct1641319388117
  implements MigrationInterface
{
  name = 'ManyToManyOrderProductProduct1641319388117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP CONSTRAINT "FK_118a4bfaaeea2b9ccec46cb873e"`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_products_entity_product_product_entity" ("orderProductsEntityId" uuid NOT NULL, "productEntityId" uuid NOT NULL, CONSTRAINT "PK_b005bd0099feab87a00bccdd91d" PRIMARY KEY ("orderProductsEntityId", "productEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5bc733a50c360bad18dceb0240" ON "order_products_entity_product_product_entity" ("orderProductsEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d59d008971ab05f87059d1ea04" ON "order_products_entity_product_product_entity" ("productEntityId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity_product_product_entity" ADD CONSTRAINT "FK_5bc733a50c360bad18dceb02405" FOREIGN KEY ("orderProductsEntityId") REFERENCES "order_products_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity_product_product_entity" ADD CONSTRAINT "FK_d59d008971ab05f87059d1ea043" FOREIGN KEY ("productEntityId") REFERENCES "product_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products_entity_product_product_entity" DROP CONSTRAINT "FK_d59d008971ab05f87059d1ea043"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity_product_product_entity" DROP CONSTRAINT "FK_5bc733a50c360bad18dceb02405"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD "productId" uuid`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d59d008971ab05f87059d1ea04"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5bc733a50c360bad18dceb0240"`,
    );
    await queryRunner.query(
      `DROP TABLE "order_products_entity_product_product_entity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD CONSTRAINT "FK_118a4bfaaeea2b9ccec46cb873e" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
