import { MigrationInterface, QueryRunner } from "typeorm";

export class BuddyBuddyTaskM2mToM201715238721373 implements MigrationInterface {
    name = 'BuddyBuddyTaskM2mToM201715238721373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP CONSTRAINT "FK_3be3b10b42cd355948218da1e00"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" RENAME COLUMN "buddiesId" TO "buddy_id"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD CONSTRAINT "FK_e12161713179ecb89b386762ca5" FOREIGN KEY ("buddy_id") REFERENCES "buddies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buddy_task" DROP CONSTRAINT "FK_e12161713179ecb89b386762ca5"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" RENAME COLUMN "buddy_id" TO "buddiesId"`);
        await queryRunner.query(`ALTER TABLE "buddy_task" ADD CONSTRAINT "FK_3be3b10b42cd355948218da1e00" FOREIGN KEY ("buddiesId") REFERENCES "buddies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
