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
        variedade as "cultura",
        "dataPlantio" as "dataPlantio",
        "faseAtual" as "fase"
      FROM plantios
      WHERE "talhaoId" = $1
      ORDER BY "dataPlantio" DESC
    `,
      [talhaoId],
    );
  }
}
