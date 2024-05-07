import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectNulltrue1715070719833 implements MigrationInterface {
    name = 'ProjectNulltrue1715070719833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "project_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "project_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
