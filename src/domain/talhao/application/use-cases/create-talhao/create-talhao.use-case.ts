import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { TALHOES_REPOSITORY } from 'src/domain/talhao/domain/repositories/talhoes-repository.token';
import type { TalhoesRepository } from 'src/domain/talhao/domain/repositories/talhoes.repository';

import { Talhao } from 'src/domain/talhao/talhao.entity';
import { Area } from 'src/domain/shared/value-objects/area.vo';
import { CreateTalhaoInput } from 'src/domain/talhao/infra/graphql/inputs/create-talhao.input';

@Injectable()
export class CreateTalhaoUseCase {
  constructor(
    @Inject(TALHOES_REPOSITORY)
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(input: CreateTalhaoInput): Promise<Talhao> {
    const jaExiste =
      await this.talhoesRepository.existsByNomeAndClienteId(
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
      input.localizacao,
    );

    await this.talhoesRepository.create(talhao);

    return talhao;
  }
}
