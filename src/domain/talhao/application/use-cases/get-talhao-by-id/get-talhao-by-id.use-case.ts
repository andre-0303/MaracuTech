import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { TALHOES_REPOSITORY } from 'src/domain/talhao/domain/repositories/talhoes-repository.token';
import type { TalhoesRepository } from 'src/domain/talhao/domain/repositories/talhoes.repository';
import { Talhao } from 'src/domain/talhao/talhao.entity';

@Injectable()
export class GetTalhaoByIdUseCase {
  constructor(
    @Inject(TALHOES_REPOSITORY)
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(id: string): Promise<Talhao> {
    const talhao = await this.talhoesRepository.findById(id);

    if (!talhao) {
      throw new NotFoundException(`Talhão com ID ${id} não encontrado`);
    }

    return talhao;
  }
}
