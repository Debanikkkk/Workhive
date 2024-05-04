import { MigrationInterface, QueryRunner } from "typeorm";

export class RolePermissionJoinerNameChange1714826442402 implements MigrationInterface {
    name = 'RolePermissionJoinerNameChange1714826442402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_permission" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_b42bbacb8402c353df822432544" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON "role_permission" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_72e80be86cab0e93e67ed1a7a9" ON "role_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72e80be86cab0e93e67ed1a7a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3130a39c1e4a740d044e68573"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
    }

}
