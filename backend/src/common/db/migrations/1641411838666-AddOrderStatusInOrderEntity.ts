import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrderStatusInOrderEntity1641411838666 implements MigrationInterface {
    name = 'AddOrderStatusInOrderEntity1641411838666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "orderStatus" character varying NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "orderStatus"`);
    }

}
