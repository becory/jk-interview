import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailLength1773217646607 implements MigrationInterface {
    name = 'EmailLength1773217646607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "fax"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "fax" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "email" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "fax"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "fax" character varying(12)`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "phone" character varying(12)`);
    }

}
