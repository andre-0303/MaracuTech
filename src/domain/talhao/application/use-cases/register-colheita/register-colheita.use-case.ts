import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { randomUUID } from 'crypto';
import type { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { TALHOES_REPOSITORY } from '../../../domain/repositories/talhoes-repository.token';
import { Colheita } from '../../../colheita.entity';
import { Quantidade } from '../../../../shared/value-objects/quantidade.vo';
import { TalhaoNaoEncontradoError } from '../../../domain/errors/talhao-nao-encontrado.error';

interface RegisterColheitaRequest {
  plantioId: string;
  data: Date;
  quantidade: number;
}

@Injectable()
export class RegisterColheitaUseCase {
  constructor(
    @Inject(TALHOES_REPOSITORY)
    private readonly talhoesRepository: TalhoesRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(data: RegisterColheitaRequest): Promise<{ id: string; data: Date; quantidade: number }> {
    const res = await this.dataSource.query(
      `SELECT "talhaoId" FROM plantios WHERE id = $1`,
      [data.plantioId],
    );

    if (!res || res.length === 0) {
      throw new TalhaoNaoEncontradoError();
    }

    const talhaoId = res[0].talhaoId;
    const talhao = await this.talhoesRepository.findById(talhaoId);

    if (!talhao) {
      throw new TalhaoNaoEncontradoError();
    }

    const colheita = new Colheita(randomUUID(), data.data, new Quantidade(data.quantidade));

    const plantio = talhao.plantios.find((p) => p.id === data.plantioId);
    if (!plantio) {
      throw new Error('Plantio não encontrado no talhão');
    }

    plantio.registrarColheita(colheita);

    await this.talhoesRepository.save(talhao);

    return { id: colheita.id, data: colheita.data, quantidade: colheita.quantidade.getValue() };
  }
}
