import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectDateChange1715394782774 implements MigrationInterface {
    name = 'ProjectDateChange1715394782774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "start_date" character varying(1024) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "end_date" character varying(1024) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "start_date" date NOT NULL`);
    }

}
