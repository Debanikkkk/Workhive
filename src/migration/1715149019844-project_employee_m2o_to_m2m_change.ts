import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectEmployeeM2oToM2mChange1715149019844 implements MigrationInterface {
    name = 'ProjectEmployeeM2oToM2mChange1715149019844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca"`);
        await queryRunner.query(`CREATE TABLE "project_employee" ("project_id" integer NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "PK_e389032875619f6c28ece923f9c" PRIMARY KEY ("project_id", "employee_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_66df5a91308ca419fa4e6f696f" ON "project_employee" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8742e48d35d539576b8a1c69f" ON "project_employee" ("employee_id") `);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "project_employee" ADD CONSTRAINT "FK_66df5a91308ca419fa4e6f696f4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_employee" ADD CONSTRAINT "FK_e8742e48d35d539576b8a1c69fb" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_employee" DROP CONSTRAINT "FK_e8742e48d35d539576b8a1c69fb"`);
        await queryRunner.query(`ALTER TABLE "project_employee" DROP CONSTRAINT "FK_66df5a91308ca419fa4e6f696f4"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "project_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8742e48d35d539576b8a1c69f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66df5a91308ca419fa4e6f696f"`);
        await queryRunner.query(`DROP TABLE "project_employee"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_25639ba1dad5b99d660d557a8ca" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
