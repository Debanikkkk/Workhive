import { MigrationInterface, QueryRunner } from "typeorm";

export class BuddyEmpM2mChange1715189135491 implements MigrationInterface {
    name = 'BuddyEmpM2mChange1715189135491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
