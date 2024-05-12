import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicDb1715406396826 implements MigrationInterface {
    name = 'BasicDb1715406396826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_letters" DROP COLUMN "letter_time"`);
        await queryRunner.query(`ALTER TABLE "hr_letters" ADD "letter_time" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_letters" DROP COLUMN "letter_time"`);
        await queryRunner.query(`ALTER TABLE "hr_letters" ADD "letter_time" character varying(16) NOT NULL`);
    }

}
