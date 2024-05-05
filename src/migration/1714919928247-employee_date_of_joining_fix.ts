import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeDateOfJoiningFix1714919928247 implements MigrationInterface {
    name = 'EmployeeDateOfJoiningFix1714919928247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP DEFAULT`);
    }

}
