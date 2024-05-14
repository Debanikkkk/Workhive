import { MigrationInterface, QueryRunner } from "typeorm";

export class DbChanges1715248519769 implements MigrationInterface {
    name = 'DbChanges1715248519769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "buddyTask"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "buddy_task" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "start_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "end_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "buddy_id" integer`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "from_date" character varying(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" character varying(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD CONSTRAINT "FK_e12161713179ecb89b386762ca5" FOREIGN KEY ("buddy_id") REFERENCES "buddies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP CONSTRAINT "FK_e12161713179ecb89b386762ca5"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "to_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "from_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "buddy_id"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "buddy_task"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "buddyTask" character varying(128) NOT NULL`);
    }

}
