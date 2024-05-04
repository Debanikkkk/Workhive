import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicDb1714630025767 implements MigrationInterface {
    name = 'BasicDb1714630025767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_05132c133569c8ccb4fdacfe46a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`CREATE TABLE "user_n_bookings" ("user_id" integer NOT NULL, "booking_id" integer NOT NULL, CONSTRAINT "PK_a4b3c0e091fde45aea891e75e5a" PRIMARY KEY ("user_id", "booking_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1883e0e52522962cb26f45c0fe" ON "user_n_bookings" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_134227796e03458b9376b5a0cd" ON "user_n_bookings" ("booking_id") `);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bookingsId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_n_bookings" ADD CONSTRAINT "FK_1883e0e52522962cb26f45c0fe0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_n_bookings" ADD CONSTRAINT "FK_134227796e03458b9376b5a0cd5" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_n_bookings" DROP CONSTRAINT "FK_134227796e03458b9376b5a0cd5"`);
        await queryRunner.query(`ALTER TABLE "user_n_bookings" DROP CONSTRAINT "FK_1883e0e52522962cb26f45c0fe0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bookingsId" integer`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "user_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_134227796e03458b9376b5a0cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1883e0e52522962cb26f45c0fe"`);
        await queryRunner.query(`DROP TABLE "user_n_bookings"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_05132c133569c8ccb4fdacfe46a" FOREIGN KEY ("bookingsId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
