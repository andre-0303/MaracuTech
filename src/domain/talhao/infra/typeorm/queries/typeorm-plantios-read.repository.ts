import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PlantiosReadRepository } from '../../../application/queries/plantios-read.repository';
import { PlantioReadDTO } from '../../../application/dtos/plantio-read.dto';

@Injectable()
export class TypeOrmPlantiosReadRepository implements PlantiosReadRepository {
  constructor(private readonly manager: EntityManager) {}

  async findByTalhaoId(talhaoId: string): Promise<PlantioReadDTO[]> {
    return this.manager.query(
      `
      SELECT 
        id,
        cultura,
        data_plantio as "dataPlantio",
        fase
      FROM plantios
      WHERE talhao_id = $1
      ORDER BY data_plantio DESC
    `,
      [talhaoId],
    );
  }
}
