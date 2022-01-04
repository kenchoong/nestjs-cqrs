import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderTableAndRelationship1641314386514
  implements MigrationInterface
{
  name = 'AddOrderTableAndRelationship1641314386514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grandTotal" numeric(10,2) NOT NULL, "userId" uuid, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_products_entity" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "productTotal" numeric(10,2) NOT NULL, "orderProductId" uuid, "productId" uuid, CONSTRAINT "REL_118a4bfaaeea2b9ccec46cb873" UNIQUE ("productId"), CONSTRAINT "PK_adcc5a07016d58e2e814793c20a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_entity" ADD CONSTRAINT "FK_4a2cf872a9121c9e2bc865bd97f" FOREIGN KEY ("orderProductId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "order_products_entity" DROP CONSTRAINT "FK_4a2cf872a9121c9e2bc865bd97f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`,
    );
    await queryRunner.query(`DROP TABLE "order_products_entity"`);
    await queryRunner.query(`DROP TABLE "order_entity"`);
  }
}
