import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicDb1714992126912 implements MigrationInterface {
    name = 'BasicDb1714992126912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "permission_name" character varying(64) NOT NULL, "permission_description" character varying(64) NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role_name" character varying(64) NOT NULL, "role_description" character varying(64) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "logo_url" character varying(1024) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "status" boolean NOT NULL, "company_id" integer NOT NULL, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "status" boolean NOT NULL, "branch_id" integer NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buddy_task" ("id" SERIAL NOT NULL, "buddyTask" character varying(128) NOT NULL, "status" boolean NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_7664224fea88e4830689cc305f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buddies" ("id" SERIAL NOT NULL, "buddy_group_name" character varying(16) NOT NULL, CONSTRAINT "PK_9156694e67bf700460aeb28ddf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "leave_request" ("id" SERIAL NOT NULL, "reason" character varying(1024) NOT NULL, "from_date" date NOT NULL, "to_date" date NOT NULL, "status" boolean NOT NULL, "employee_id" integer, CONSTRAINT "PK_6f6ed3822203a4e10a5753368db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clockin" ("id" SERIAL NOT NULL, "clock_in" TIMESTAMP NOT NULL DEFAULT now(), "clock_out" TIMESTAMP, "employee_id" integer, CONSTRAINT "PK_6ec0c11fccf421c0ac1798e90e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hr_letters" ("id" SERIAL NOT NULL, "letter_subject" character varying(1024) NOT NULL, "letter_content" character varying(1024) NOT NULL, "letter_time" TIMESTAMP NOT NULL DEFAULT now(), "employee_id" integer, CONSTRAINT "PK_99a50a9f62f37c3a9581106f9ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "first_name" character varying(64) NOT NULL, "last_name" character varying(64) NOT NULL, "salary" integer NOT NULL, "date_of_joining" date NOT NULL DEFAULT now(), "username" character varying(64) NOT NULL, "password" character varying(16) NOT NULL, "status" boolean NOT NULL, "role_id" integer NOT NULL, "department_id" integer NOT NULL, "branch_id" integer NOT NULL, "company_id" integer NOT NULL, CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE ("username"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "department_id" integer NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "status" boolean NOT NULL, "lastName" character varying(64) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time" ("id" SERIAL NOT NULL, "startTime" TIMESTAMP NOT NULL, "elapsedTime" interval, CONSTRAINT "PK_9ec81ea937e5d405c33a9f49251" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_19a94c31d4960ded0dcd0397759" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
        await queryRunner.query(`CREATE TABLE "buddies_n_buddy_tasks" ("buddiesId" integer NOT NULL, "buddyTaskId" integer NOT NULL, CONSTRAINT "PK_90043c7dd6666a6c90f3dc31f66" PRIMARY KEY ("buddiesId", "buddyTaskId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb58edb4602eb1292b919803dd" ON "buddies_n_buddy_tasks" ("buddiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_70c82e0f7686f4248a2000959c" ON "buddies_n_buddy_tasks" ("buddyTaskId") `);
        await queryRunner.query(`CREATE TABLE "employee_n_buddies" ("employee_id" integer NOT NULL, "buddies_id" integer NOT NULL, CONSTRAINT "PK_ce6808bbec49655e898f80d21f1" PRIMARY KEY ("employee_id", "buddies_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_41e0ab448dc118d9cf73b6e24b" ON "employee_n_buddies" ("employee_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9fa865679a6393c3b8e5c14eec" ON "employee_n_buddies" ("buddies_id") `);
        await queryRunner.query(`CREATE TABLE "employee_n_skill" ("employee_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_ba20df38be52de7fba5c99e00e8" PRIMARY KEY ("employee_id", "skill_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eac235ceaee666224ce14fe2f6" ON "employee_n_skill" ("employee_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7ca3321c08af5dc80369fd218" ON "employee_n_skill" ("skill_id") `);
        await queryRunner.query(`CREATE TABLE "project_skill" ("skill_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_a21ed6d332fe43c23f982b7abf5" PRIMARY KEY ("skill_id", "project_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_68a9c8c148b1414d22d4e1712e" ON "project_skill" ("skill_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cd863c74efd07556cdad17513" ON "project_skill" ("project_id") `);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_876085341242e41592b0e6b15e0" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_41c031dfb93242db776851090d7" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_f457a5663e14c8aa27ce95a8a6a" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clockin" ADD CONSTRAINT "FK_fa7f04c2b2112822dd7da29c45a" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hr_letters" ADD CONSTRAINT "FK_2302daebe9c328288a67a6dba20" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_1c105b756816efbdeae09a9ab65" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_380241ef3c0ea0a87b9411f37ff" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_3f25598a5f106392263f58a2eb2" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3841f0702bb3021e8b88bc8915f" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" ADD CONSTRAINT "FK_cb58edb4602eb1292b919803dd2" FOREIGN KEY ("buddiesId") REFERENCES "buddies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" ADD CONSTRAINT "FK_70c82e0f7686f4248a2000959ce" FOREIGN KEY ("buddyTaskId") REFERENCES "buddy_task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" ADD CONSTRAINT "FK_9fa865679a6393c3b8e5c14eec7" FOREIGN KEY ("buddies_id") REFERENCES "buddies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" ADD CONSTRAINT "FK_eac235ceaee666224ce14fe2f69" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" ADD CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_skill" ADD CONSTRAINT "FK_68a9c8c148b1414d22d4e1712e0" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_skill" ADD CONSTRAINT "FK_5cd863c74efd07556cdad17513c" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_skill" DROP CONSTRAINT "FK_5cd863c74efd07556cdad17513c"`);
        await queryRunner.query(`ALTER TABLE "project_skill" DROP CONSTRAINT "FK_68a9c8c148b1414d22d4e1712e0"`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" DROP CONSTRAINT "FK_b7ca3321c08af5dc80369fd218b"`);
        await queryRunner.query(`ALTER TABLE "employee_n_skill" DROP CONSTRAINT "FK_eac235ceaee666224ce14fe2f69"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "FK_9fa865679a6393c3b8e5c14eec7"`);
        await queryRunner.query(`ALTER TABLE "employee_n_buddies" DROP CONSTRAINT "FK_41e0ab448dc118d9cf73b6e24b1"`);
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" DROP CONSTRAINT "FK_70c82e0f7686f4248a2000959ce"`);
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" DROP CONSTRAINT "FK_cb58edb4602eb1292b919803dd2"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3841f0702bb3021e8b88bc8915f"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_3f25598a5f106392263f58a2eb2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_380241ef3c0ea0a87b9411f37ff"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_1c105b756816efbdeae09a9ab65"`);
        await queryRunner.query(`ALTER TABLE "hr_letters" DROP CONSTRAINT "FK_2302daebe9c328288a67a6dba20"`);
        await queryRunner.query(`ALTER TABLE "clockin" DROP CONSTRAINT "FK_fa7f04c2b2112822dd7da29c45a"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_f457a5663e14c8aa27ce95a8a6a"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_41c031dfb93242db776851090d7"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_876085341242e41592b0e6b15e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5cd863c74efd07556cdad17513"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68a9c8c148b1414d22d4e1712e"`);
        await queryRunner.query(`DROP TABLE "project_skill"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7ca3321c08af5dc80369fd218"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eac235ceaee666224ce14fe2f6"`);
        await queryRunner.query(`DROP TABLE "employee_n_skill"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9fa865679a6393c3b8e5c14eec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41e0ab448dc118d9cf73b6e24b"`);
        await queryRunner.query(`DROP TABLE "employee_n_buddies"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_70c82e0f7686f4248a2000959c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb58edb4602eb1292b919803dd"`);
        await queryRunner.query(`DROP TABLE "buddies_n_buddy_tasks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d0a7155eafd75ddba5a701336"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP TABLE "time"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "hr_letters"`);
        await queryRunner.query(`DROP TABLE "clockin"`);
        await queryRunner.query(`DROP TABLE "leave_request"`);
        await queryRunner.query(`DROP TABLE "buddies"`);
        await queryRunner.query(`DROP TABLE "buddy_task"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
