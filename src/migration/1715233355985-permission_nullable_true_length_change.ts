import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionNullableTrueLengthChange1715233355985 implements MigrationInterface {
    name = 'PermissionNullableTrueLengthChange1715233355985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "permission_description"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "permission_description" character varying(1024)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "permission_description"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "permission_description" character varying(64) NOT NULL`);
    }

}
