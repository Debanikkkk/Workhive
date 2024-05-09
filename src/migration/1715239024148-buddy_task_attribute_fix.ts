import { MigrationInterface, QueryRunner } from "typeorm";

export class BuddyTaskAttributeFix1715239024148 implements MigrationInterface {
    name = 'BuddyTaskAttributeFix1715239024148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "buddyTask"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "buddy_task" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "start_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "end_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP COLUMN "buddy_task"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "buddyTask" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD "startDate" TIMESTAMP NOT NULL`);
    }

}
