import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ColheitasReadRepository } from '../../../application/queries/colheitas-read.repository';
import { ColheitaReadDTO } from '../../../application/dtos/colheita-read.dto';

@Injectable()
export class TypeOrmColheitasReadRepository implements ColheitasReadRepository {
  constructor(private readonly manager: EntityManager) {}

  async findByPlantioId(plantioId: string): Promise<ColheitaReadDTO[]> {
    return this.manager.query(
      `
      SELECT
        id,
        data,
        quantidade
      FROM colheitas
      WHERE "plantioId" = $1
      ORDER BY data DESC
    `,
      [plantioId],
    );
  }
}
