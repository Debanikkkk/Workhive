import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicDb1714410070661 implements MigrationInterface {
    name = 'BasicDb1714410070661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time" ("id" SERIAL NOT NULL, "startTime" TIMESTAMP NOT NULL, "elapsedTime" interval, CONSTRAINT "PK_9ec81ea937e5d405c33a9f49251" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "permissionName" character varying(64) NOT NULL, "permissionDescription" character varying(64) NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "roleName" character varying(64) NOT NULL, "roleDescription" character varying(64) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "logo_url" character varying(1024) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "status" boolean NOT NULL, "company_id" integer NOT NULL, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "firstName" character varying(64) NOT NULL, "lastName" character varying(64) NOT NULL, "username" character varying(64) NOT NULL, "status" boolean NOT NULL, "roleId" integer NOT NULL, "departmentId" integer NOT NULL, "branchId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_8e3e7d82a105202ae6bbda01828" PRIMARY KEY ("id", "username"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "status" boolean NOT NULL, "branch_id" integer NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "department_id" integer NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "status" boolean NOT NULL, "project_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_skill" ("skill_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_a21ed6d332fe43c23f982b7abf5" PRIMARY KEY ("skill_id", "project_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_68a9c8c148b1414d22d4e1712e" ON "project_skill" ("skill_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cd863c74efd07556cdad17513" ON "project_skill" ("project_id") `);
        await queryRunner.query(`CREATE TABLE "rolePermission" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_478b7ec0c0b20d7462e9c20170f" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_58834af6412116c30386c87158" ON "rolePermission" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0fd3983058cf5f71c1108ba4b8" ON "rolePermission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_876085341242e41592b0e6b15e0" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_646b91cc56d9fd9760973b4980d" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_c36b6dc182259c56ee8c1cfecb3" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_26c3d513e0832e5abbbdd3d2a88" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_41c031dfb93242db776851090d7" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3841f0702bb3021e8b88bc8915f" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5c8d26dee2b23a5a654f1a27606" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_skill" ADD CONSTRAINT "FK_68a9c8c148b1414d22d4e1712e0" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_skill" ADD CONSTRAINT "FK_5cd863c74efd07556cdad17513c" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rolePermission" ADD CONSTRAINT "FK_58834af6412116c30386c87158d" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rolePermission" ADD CONSTRAINT "FK_0fd3983058cf5f71c1108ba4b8c" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rolePermission" DROP CONSTRAINT "FK_0fd3983058cf5f71c1108ba4b8c"`);
        await queryRunner.query(`ALTER TABLE "rolePermission" DROP CONSTRAINT "FK_58834af6412116c30386c87158d"`);
        await queryRunner.query(`ALTER TABLE "project_skill" DROP CONSTRAINT "FK_5cd863c74efd07556cdad17513c"`);
        await queryRunner.query(`ALTER TABLE "project_skill" DROP CONSTRAINT "FK_68a9c8c148b1414d22d4e1712e0"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5c8d26dee2b23a5a654f1a27606"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3841f0702bb3021e8b88bc8915f"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_41c031dfb93242db776851090d7"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_26c3d513e0832e5abbbdd3d2a88"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_c36b6dc182259c56ee8c1cfecb3"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_646b91cc56d9fd9760973b4980d"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_876085341242e41592b0e6b15e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fd3983058cf5f71c1108ba4b8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58834af6412116c30386c87158"`);
        await queryRunner.query(`DROP TABLE "rolePermission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5cd863c74efd07556cdad17513"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68a9c8c148b1414d22d4e1712e"`);
        await queryRunner.query(`DROP TABLE "project_skill"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "time"`);
    }

}
