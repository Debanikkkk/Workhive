import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveStatusDefaultFalse1714917501743 implements MigrationInterface {
    name = 'LeaveStatusDefaultFalse1714917501743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "status"`);
    }

}
