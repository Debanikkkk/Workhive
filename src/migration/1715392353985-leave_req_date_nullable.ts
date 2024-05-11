import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveReqDateNullable1715392353985 implements MigrationInterface {
    name = 'LeaveReqDateNullable1715392353985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" character varying(24)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" character varying NOT NULL`);
    }

}
