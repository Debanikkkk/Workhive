import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeBuddyM2m1714820916076 implements MigrationInterface {
    name = 'EmployeeBuddyM2m1714820916076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_f766e108254ec5f667628700b5f"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "FK_a7ad7bb7ed3588fe49c149f52a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7ad7bb7ed3588fe49c149f52a"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "employeeUsername"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "PK_3f2db08d2eddecddd44d5cd4467"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "PK_8424f373ecce6729e55fb6b39da" PRIMARY KEY ("buddies_id", "employeeUsername")`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP COLUMN "employeeId"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "PK_8424f373ecce6729e55fb6b39da"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "PK_9fa865679a6393c3b8e5c14eec7" PRIMARY KEY ("buddies_id")`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP COLUMN "employeeUsername"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD "employee_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "PK_9fa865679a6393c3b8e5c14eec7"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "PK_ce6808bbec49655e898f80d21f1" PRIMARY KEY ("buddies_id", "employee_id")`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "PK_8e3e7d82a105202ae6bbda01828"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE ("username")`);
        await queryRunner.query(`CREATE INDEX "IDX_41e0ab448dc118d9cf73b6e24b" ON "employee_n_buddies" ("employee_id") `);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_03889549dbbc56e2a9f5ce107a0" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_03889549dbbc56e2a9f5ce107a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41e0ab448dc118d9cf73b6e24b"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "PK_8e3e7d82a105202ae6bbda01828" PRIMARY KEY ("id", "username")`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "PK_ce6808bbec49655e898f80d21f1"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "PK_9fa865679a6393c3b8e5c14eec7" PRIMARY KEY ("buddies_id")`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD "employeeUsername" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "PK_9fa865679a6393c3b8e5c14eec7"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "PK_8424f373ecce6729e55fb6b39da" PRIMARY KEY ("buddies_id", "employeeUsername")`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD "employeeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "PK_8424f373ecce6729e55fb6b39da"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "PK_3f2db08d2eddecddd44d5cd4467" PRIMARY KEY ("employeeId", "buddies_id", "employeeUsername")`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "employeeUsername" character varying(64)`);
        await queryRunner.query(`CREATE INDEX "IDX_a7ad7bb7ed3588fe49c149f52a" ON "employee_n_buddies" ("employeeId", "employeeUsername") `);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "FK_a7ad7bb7ed3588fe49c149f52a6" FOREIGN KEY ("employeeId", "employeeUsername") REFERENCES "employee"("id","username") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_f766e108254ec5f667628700b5f" FOREIGN KEY ("employeeId", "employeeUsername") REFERENCES "employee"("id","username") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
