import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStripePaymentIntentIdColumnInOrderEntity1641481145702 implements MigrationInterface {
    name = 'AddStripePaymentIntentIdColumnInOrderEntity1641481145702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "orderPaymentIntentId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "orderPaymentIntentId"`);
    }

}
