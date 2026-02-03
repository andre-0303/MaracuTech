import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TalhoesReadRepository } from '../../../application/queries/talhoes-read.repository';
import { TalhaoReadDTO } from '../../../application/dtos/talhao-read.dto';

@Injectable()
export class TypeOrmTalhoesReadRepository implements TalhoesReadRepository {
  constructor(private readonly manager: EntityManager) {}

  async findByClienteId(clienteId: string): Promise<TalhaoReadDTO[]> {
    return this.manager.query(
      `
      SELECT 
        t.id,
        t.nome,
        t.area,
        t.localizacao,
        COUNT(p.id) as "totalPlantios"
      FROM talhoes t
      LEFT JOIN plantios p ON p.talhao_id = t.id
      WHERE t.cliente_id = $1
      GROUP BY t.id
      ORDER BY t.nome
    `,
      [clienteId],
    );
  }
}
