import { MigrationInterface, QueryRunner } from "typeorm";

export class RolePermissionAttributeSnakeCase1714826919092 implements MigrationInterface {
    name = 'RolePermissionAttributeSnakeCase1714826919092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "permissionName"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "permissionDescription"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "roleName"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "roleDescription"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "permission_name" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "permission_description" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD "role_name" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD "role_description" character varying(64) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "role_description"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "role_name"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "permission_description"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "permission_name"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "roleDescription" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD "roleName" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "permissionDescription" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "permissionName" character varying(64) NOT NULL`);
    }

}
