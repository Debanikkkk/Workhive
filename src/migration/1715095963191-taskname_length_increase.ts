import { MigrationInterface, QueryRunner } from "typeorm";

export class TasknameLengthIncrease1715095963191 implements MigrationInterface {
    name = 'TasknameLengthIncrease1715095963191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "name" character varying(1024) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "name" character varying(16) NOT NULL`);
    }

}
