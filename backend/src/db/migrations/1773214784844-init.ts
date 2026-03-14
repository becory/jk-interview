import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773214784844 implements MigrationInterface {
    name = 'Init1773214784844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca" UNIQUE ("name"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_8d766fc1d4d2e72ecd5f6567a02" UNIQUE ("name"), CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "charity" ("id" SERIAL NOT NULL, "org_id" integer NOT NULL, "name" character varying(100) NOT NULL, "phone" character varying(12) NOT NULL, "fax" character varying(12) NOT NULL, "email" character varying NOT NULL, "contact" character varying(20) NOT NULL, "ceo" character varying(20) NOT NULL, "address" character varying NOT NULL, "logo" character varying NOT NULL, "categoryId" integer, CONSTRAINT "UQ_f6045e890aa081bb0d049111229" UNIQUE ("org_id"), CONSTRAINT "UQ_ac5d5f85641be5b68ace6a50a0b" UNIQUE ("name"), CONSTRAINT "PK_fbdd8ba5b5a6504618b8b1ab295" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "charity_regions_region" ("charityId" integer NOT NULL, "regionId" integer NOT NULL, CONSTRAINT "PK_bd69891999537dc6d34f78efdb8" PRIMARY KEY ("charityId", "regionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e46b2fbd559ed1e14e52d1b0ed" ON "charity_regions_region" ("charityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bed75f67432f83a77b7e1b422c" ON "charity_regions_region" ("regionId") `);
        await queryRunner.query(`CREATE TABLE "charity_services_service" ("charityId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_1a74c950864c59a4bc79b87b04d" PRIMARY KEY ("charityId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_38c007beeadf012fdd3ff131e9" ON "charity_services_service" ("charityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3f6fd88301309d562cd989411" ON "charity_services_service" ("serviceId") `);
        await queryRunner.query(`ALTER TABLE "charity" ADD CONSTRAINT "FK_6e436c237290b0845a898b5508d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "charity_regions_region" ADD CONSTRAINT "FK_e46b2fbd559ed1e14e52d1b0ed0" FOREIGN KEY ("charityId") REFERENCES "charity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "charity_regions_region" ADD CONSTRAINT "FK_bed75f67432f83a77b7e1b422cf" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "charity_services_service" ADD CONSTRAINT "FK_38c007beeadf012fdd3ff131e9f" FOREIGN KEY ("charityId") REFERENCES "charity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "charity_services_service" ADD CONSTRAINT "FK_b3f6fd88301309d562cd9894117" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charity_services_service" DROP CONSTRAINT "FK_b3f6fd88301309d562cd9894117"`);
        await queryRunner.query(`ALTER TABLE "charity_services_service" DROP CONSTRAINT "FK_38c007beeadf012fdd3ff131e9f"`);
        await queryRunner.query(`ALTER TABLE "charity_regions_region" DROP CONSTRAINT "FK_bed75f67432f83a77b7e1b422cf"`);
        await queryRunner.query(`ALTER TABLE "charity_regions_region" DROP CONSTRAINT "FK_e46b2fbd559ed1e14e52d1b0ed0"`);
        await queryRunner.query(`ALTER TABLE "charity" DROP CONSTRAINT "FK_6e436c237290b0845a898b5508d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3f6fd88301309d562cd989411"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38c007beeadf012fdd3ff131e9"`);
        await queryRunner.query(`DROP TABLE "charity_services_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bed75f67432f83a77b7e1b422c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e46b2fbd559ed1e14e52d1b0ed"`);
        await queryRunner.query(`DROP TABLE "charity_regions_region"`);
        await queryRunner.query(`DROP TABLE "charity"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }

}
