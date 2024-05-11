import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveReqDate1715392285995 implements MigrationInterface {
    name = 'LeaveReqDate1715392285995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" character varying(24) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" character varying NOT NULL`);
    }

}
