import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMig1714631237003 implements MigrationInterface {
    name = 'TestMig1714631237003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" ADD "no_of_seats" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" DROP COLUMN "no_of_seats"`);
    }

}
