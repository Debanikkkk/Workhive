import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveRequestNBuddiesEntity1714747527827 implements MigrationInterface {
    name = 'LeaveRequestNBuddiesEntity1714747527827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leave_request" ("id" SERIAL NOT NULL, "reason" character varying(1024) NOT NULL, "from_date" TIMESTAMP NOT NULL, "to_date" TIMESTAMP NOT NULL, "employeeId" integer, "employeeUsername" character varying(64), CONSTRAINT "PK_6f6ed3822203a4e10a5753368db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buddies" ("id" SERIAL NOT NULL, "buddy_group_name" character varying(16) NOT NULL, CONSTRAINT "PK_9156694e67bf700460aeb28ddf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buddy_task" ("id" SERIAL NOT NULL, "buddyTask" character varying(128) NOT NULL, "status" boolean NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_7664224fea88e4830689cc305f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buddies_n_buddy_tasks" ("buddiesId" integer NOT NULL, "buddyTaskId" integer NOT NULL, CONSTRAINT "PK_90043c7dd6666a6c90f3dc31f66" PRIMARY KEY ("buddiesId", "buddyTaskId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb58edb4602eb1292b919803dd" ON "buddies_n_buddy_tasks" ("buddiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_70c82e0f7686f4248a2000959c" ON "buddies_n_buddy_tasks" ("buddyTaskId") `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_f766e108254ec5f667628700b5f" FOREIGN KEY ("employeeId", "employeeUsername") REFERENCES "employee"("id","username") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" ADD CONSTRAINT "FK_cb58edb4602eb1292b919803dd2" FOREIGN KEY ("buddiesId") REFERENCES "buddies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" ADD CONSTRAINT "FK_70c82e0f7686f4248a2000959ce" FOREIGN KEY ("buddyTaskId") REFERENCES "buddy_task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" DROP CONSTRAINT "FK_70c82e0f7686f4248a2000959ce"`);
        await queryRunner.query(`ALTER TABLE "buddies_n_buddy_tasks" DROP CONSTRAINT "FK_cb58edb4602eb1292b919803dd2"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_f766e108254ec5f667628700b5f"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_70c82e0f7686f4248a2000959c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb58edb4602eb1292b919803dd"`);
        await queryRunner.query(`DROP TABLE "buddies_n_buddy_tasks"`);
        await queryRunner.query(`DROP TABLE "buddy_task"`);
        await queryRunner.query(`DROP TABLE "buddies"`);
        await queryRunner.query(`DROP TABLE "leave_request"`);
    }

}
