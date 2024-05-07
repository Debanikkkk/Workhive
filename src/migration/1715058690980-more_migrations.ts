import { MigrationInterface, QueryRunner } from "typeorm";

export class MoreMigrations1715058690980 implements MigrationInterface {
    name = 'MoreMigrations1715058690980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "project_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "lastName" character varying(64) NOT NULL`);
    }

}
