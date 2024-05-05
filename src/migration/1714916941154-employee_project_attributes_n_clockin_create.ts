import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeProjectAttributesNClockinCreate1714916941154 implements MigrationInterface {
    name = 'EmployeeProjectAttributesNClockinCreate1714916941154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5c8d26dee2b23a5a654f1a27606"`);
        await queryRunner.query(`CREATE TABLE "clockin" ("id" SERIAL NOT NULL, "clock_in" TIMESTAMP NOT NULL DEFAULT now(), "clock_out" TIMESTAMP, "employee_id" integer, CONSTRAINT "PK_6ec0c11fccf421c0ac1798e90e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_n_skill" ("employee_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_ba20df38be52de7fba5c99e00e8" PRIMARY KEY ("employee_id", "skill_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eac235ceaee666224ce14fe2f6" ON "employee_n_skill" ("employee_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7ca3321c08af5dc80369fd218" ON "employee_n_skill" ("skill_id") `);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "skill_id"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "lastName" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "start_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "start_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "salary" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clockin" ADD CONSTRAINT "FK_fa7f04c2b2112822dd7da29c45a" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" ADD CONSTRAINT "FK_eac235ceaee666224ce14fe2f69" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" ADD CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_n_skill" DROP CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b"`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" DROP CONSTRAINT "FK_eac235ceaee666224ce14fe2f69"`);
        await queryRunner.query(`ALTER TABLE "clockin" DROP CONSTRAINT "FK_fa7f04c2b2112822dd7da29c45a"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "salary"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "skill_id" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7ca3321c08af5dc80369fd218"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eac235ceaee666224ce14fe2f6"`);
        await queryRunner.query(`DROP TABLE "employee_n_skill"`);
        await queryRunner.query(`DROP TABLE "clockin"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5c8d26dee2b23a5a654f1a27606" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
