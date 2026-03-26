import { Inject, Injectable } from '@nestjs/common';
import type { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { TALHOES_REPOSITORY } from '../../../domain/repositories/talhoes-repository.token';
import { FaseCultivo } from '../../../domain/enums/fase-cultivo.enum';
import { TalhaoNaoEncontradoError } from '../../../domain/errors/talhao-nao-encontrado.error';

interface AdvanceFasePlantioRequest {
  talhaoId: string;
  clienteId: string;
  plantioId: string;
  novaFase: FaseCultivo;
}

@Injectable()
export class AdvanceFasePlantioUseCase {
  constructor(
    @Inject(TALHOES_REPOSITORY)
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(data: AdvanceFasePlantioRequest): Promise<void> {
    const talhao = await this.talhoesRepository.findById(data.talhaoId);

    if (!talhao || talhao.clienteId !== data.clienteId) {
      throw new TalhaoNaoEncontradoError();
    }

    talhao.advanceFasePlantio(data.plantioId, data.novaFase);

    await this.talhoesRepository.save(talhao);
  }
}

