import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullable1773216912494 implements MigrationInterface {
    name = 'Nullable1773216912494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" ALTER COLUMN "fax" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "address" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "logo" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "logo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" ALTER COLUMN "fax" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "charity" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
