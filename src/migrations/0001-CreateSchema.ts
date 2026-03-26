import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema0001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id uuid PRIMARY KEY,
        nome varchar NOT NULL,
        email varchar NOT NULL UNIQUE,
        telefone varchar NOT NULL,
        ativo boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS talhoes (
        id uuid PRIMARY KEY,
        "clienteId" uuid NOT NULL,
        nome varchar NOT NULL,
        area numeric(10,2) NOT NULL,
        localizacao varchar NOT NULL,
        ativo boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS IDX_TALHOES_CLIENTEID ON talhoes ("clienteId");

      CREATE TABLE IF NOT EXISTS plantios (
        id uuid PRIMARY KEY,
        variedade varchar NOT NULL,
        "dataPlantio" date NOT NULL,
        "quantidadeMudas" int NOT NULL,
        "faseAtual" int NOT NULL DEFAULT 1,
        "talhaoId" uuid NOT NULL
      );

      ALTER TABLE plantios
        ADD CONSTRAINT FK_PLANTIOS_TALHAO FOREIGN KEY ("talhaoId") REFERENCES talhoes(id) ON DELETE CASCADE;

      CREATE TABLE IF NOT EXISTS colheitas (
        id uuid PRIMARY KEY,
        "data" date NOT NULL,
        quantidade int NOT NULL,
        "plantioId" uuid NOT NULL
      );

      ALTER TABLE colheitas
        ADD CONSTRAINT FK_COLHEITAS_PLANTIO FOREIGN KEY ("plantioId") REFERENCES plantios(id) ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE IF EXISTS colheitas DROP CONSTRAINT IF EXISTS FK_COLHEITAS_PLANTIO;
      DROP TABLE IF EXISTS colheitas;
      ALTER TABLE IF EXISTS plantios DROP CONSTRAINT IF EXISTS FK_PLANTIOS_TALHAO;
      DROP TABLE IF EXISTS plantios;
      DROP INDEX IF EXISTS IDX_TALHOES_CLIENTEID;
      DROP TABLE IF EXISTS talhoes;
      DROP TABLE IF EXISTS clientes;
    `);
  }
}

