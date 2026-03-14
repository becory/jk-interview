import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressLimit1773216802694 implements MigrationInterface {
    name = 'AddressLimit1773216802694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "address" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "logo" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "logo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "address" character varying NOT NULL`);
    }

}
