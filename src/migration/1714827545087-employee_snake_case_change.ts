import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeSnakeCaseChange1714827545087 implements MigrationInterface {
    name = 'EmployeeSnakeCaseChange1714827545087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_26c3d513e0832e5abbbdd3d2a88"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_c36b6dc182259c56ee8c1cfecb3"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_646b91cc56d9fd9760973b4980d"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "departmentId"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "branchId"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "branch_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "company_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_1c105b756816efbdeae09a9ab65" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_380241ef3c0ea0a87b9411f37ff" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_3f25598a5f106392263f58a2eb2" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_3f25598a5f106392263f58a2eb2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_380241ef3c0ea0a87b9411f37ff"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_1c105b756816efbdeae09a9ab65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "companyId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "branchId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "departmentId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "roleId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_646b91cc56d9fd9760973b4980d" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_c36b6dc182259c56ee8c1cfecb3" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_26c3d513e0832e5abbbdd3d2a88" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
