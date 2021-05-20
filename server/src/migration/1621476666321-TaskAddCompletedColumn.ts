import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskAddCompletedColumn1621476666321 implements MigrationInterface {
  name = "TaskAddCompletedColumn1621476666321";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
  }
}
