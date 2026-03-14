import { MigrationInterface, QueryRunner } from "typeorm";

export class LogoUrlText1773216659308 implements MigrationInterface {
    name = 'LogoUrlText1773216659308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "logo" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "charity" ADD "logo" character varying NOT NULL`);
    }

}
