import { MigrationInterface, QueryRunner } from "typeorm";

export class Lazy1715075411973 implements MigrationInterface {
    name = 'Lazy1715075411973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_n_skill" DROP CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b"`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" ADD CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_n_skill" DROP CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b"`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" ADD CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
