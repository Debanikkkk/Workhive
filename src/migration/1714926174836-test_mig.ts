import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMig1714926174836 implements MigrationInterface {
    name = 'TestMig1714926174836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_03889549dbbc56e2a9f5ce107a0"`);
        await queryRunner.query(`ALTER TABLE "leave_request" RENAME COLUMN "employeeId" TO "employee_id"`);
        await queryRunner.query(`CREATE TABLE "hr_letters" ("id" SERIAL NOT NULL, "letter_subject" character varying(1024) NOT NULL, "letter_content" character varying(1024) NOT NULL, "letter_time" TIMESTAMP NOT NULL DEFAULT now(), "employee_id" integer, CONSTRAINT "PK_99a50a9f62f37c3a9581106f9ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_f457a5663e14c8aa27ce95a8a6a" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hr_letters" ADD CONSTRAINT "FK_2302daebe9c328288a67a6dba20" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_letters" DROP CONSTRAINT "FK_2302daebe9c328288a67a6dba20"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_f457a5663e14c8aa27ce95a8a6a"`);
        await queryRunner.query(`DROP TABLE "hr_letters"`);
        await queryRunner.query(`ALTER TABLE "leave_request" RENAME COLUMN "employee_id" TO "employeeId"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_03889549dbbc56e2a9f5ce107a0" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
