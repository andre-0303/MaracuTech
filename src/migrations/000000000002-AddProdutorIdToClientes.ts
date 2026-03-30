import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProdutorIdToClientes00000000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE clientes ADD COLUMN "produtorId" uuid;
      CREATE INDEX IF NOT EXISTS IDX_CLIENTES_PRODUTORID ON clientes ("produtorId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS IDX_CLIENTES_PRODUTORID;
      ALTER TABLE clientes DROP COLUMN IF EXISTS "produtorId";
    `);
  }
}
