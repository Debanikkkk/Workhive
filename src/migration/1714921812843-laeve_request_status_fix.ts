import { MigrationInterface, QueryRunner } from "typeorm";

export class LaeveRequestStatusFix1714921812843 implements MigrationInterface {
    name = 'LaeveRequestStatusFix1714921812843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" ALTER COLUMN "status" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" ALTER COLUMN "status" SET DEFAULT false`);
    }

}
