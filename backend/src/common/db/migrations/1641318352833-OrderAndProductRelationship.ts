import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderAndProductRelationship1641318352833
  implements MigrationInterface
{
  name = 'OrderAndProductRelationship1641318352833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP CONSTRAINT "FK_118a4bfaaeea2b9ccec46cb873e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" DROP CONSTRAINT "REL_118a4bfaaeea2b9ccec46cb873"`,
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
      `ALTER TABLE "order_products_entity" ADD CONSTRAINT "REL_118a4bfaaeea2b9ccec46cb873" UNIQUE ("productId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD CONSTRAINT "FK_118a4bfaaeea2b9ccec46cb873e" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
