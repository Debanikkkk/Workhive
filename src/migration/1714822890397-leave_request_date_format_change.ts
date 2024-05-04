import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveRequestDateFormatChange1714822890397 implements MigrationInterface {
    name = 'LeaveRequestDateFormatChange1714822890397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "from_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "from_date" TIMESTAMP NOT NULL`);
    }

}
