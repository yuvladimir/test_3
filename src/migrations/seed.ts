import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1731836230052 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" text NOT NULL, "age" integer NOT NULL, "gender" text NOT NULL, "hasProblems" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6625ded271a361208bfa74c30d" ON "users" ("hasProblems") `,
    );
    await queryRunner.query(`
        INSERT INTO users ("firstName", "lastName", "age", "gender", "hasProblems")
        SELECT md5(random()::TEXT)
             , md5(random()::TEXT)
             , floor(random()* (90-18 + 1) + 18)
             , case when random() > 0.5 then 'male' else 'female' end
             , random()::INT::BOOLEAN
        FROM generate_series(1, 1500000)`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6625ded271a361208bfa74c30d"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
