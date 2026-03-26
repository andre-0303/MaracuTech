import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';

import type { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { TALHOES_REPOSITORY } from '../../../domain/repositories/talhoes-repository.token';

import { Talhao } from '../../../talhao.entity';
import { Area } from '../../../../shared/value-objects/area.vo';
import { Localizacao } from '../../../../shared/value-objects/localizacao.vo';
import { CreateTalhaoInput } from '../../../infra/graphql/inputs/create-talhao.input';

@Injectable()
export class CreateTalhaoUseCase {
  constructor(
    @Inject(TALHOES_REPOSITORY)
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(input: CreateTalhaoInput): Promise<Talhao> {
    const jaExiste = await this.talhoesRepository.existsByNomeAndClienteId(
      input.nome,
      input.clienteId,
    );

    if (jaExiste) {
      throw new Error('Já existe um talhão com esse nome para este cliente');
    }

    const talhao = Talhao.create(
      randomUUID(),
      input.clienteId,
      input.nome,
      new Area(input.area),
      new Localizacao(input.localizacao),
    );

    await this.talhoesRepository.create(talhao);

    return talhao;
  }
}

