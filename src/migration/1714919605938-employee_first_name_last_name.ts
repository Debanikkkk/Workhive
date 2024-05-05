import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeFirstNameLastName1714919605938 implements MigrationInterface {
    name = 'EmployeeFirstNameLastName1714919605938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "first_name" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "last_name" character varying(64) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "lastName" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "firstName" character varying(64) NOT NULL`);
    }

}
