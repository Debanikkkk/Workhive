import { MigrationInterface, QueryRunner } from "typeorm";

export class Hrletterstime1715503191397 implements MigrationInterface {
    name = 'Hrletterstime1715503191397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_letters" DROP COLUMN "letter_time"`);
        await queryRunner.query(`ALTER TABLE "hr_letters" ADD "letter_time" character varying(16) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_letters" DROP COLUMN "letter_time"`);
        await queryRunner.query(`ALTER TABLE "hr_letters" ADD "letter_time" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
