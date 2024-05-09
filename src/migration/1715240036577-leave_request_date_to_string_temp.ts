import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveRequestDateToStringTemp1715240036577 implements MigrationInterface {
    name = 'LeaveRequestDateToStringTemp1715240036577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "from_date" character varying(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" character varying(24) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "from_date" date NOT NULL`);
    }

}
