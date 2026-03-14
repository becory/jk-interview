import { MigrationInterface, QueryRunner } from "typeorm";

export class PhoneLength1773217166706 implements MigrationInterface {
    name = 'PhoneLength1773217166706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "fax"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "fax" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "fax"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "fax" character varying(12)`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "phone" character varying(12)`);
    }

}
