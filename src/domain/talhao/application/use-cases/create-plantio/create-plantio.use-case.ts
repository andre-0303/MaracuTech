import { Inject } from '@nestjs/common';
import type { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import type { Talhao } from '../../../talhao.entity';
import { TalhaoNaoEncontradoError } from '../../../domain/errors/talhao-nao-encontrado.error';

interface CreatePlantioRequest {
  talhaoId: string;
  clienteId: string;
  cultura: string;
  dataPlantio: Date;
}

export class CreatePlantioUseCase {
  constructor(
    @Inject('TalhoesRepository')
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(data: CreatePlantioRequest): Promise<void> {
    const talhao = await this.talhoesRepository.findById(data.talhaoId);

    if (!talhao || talhao.clienteId !== data.clienteId) {
      throw new TalhaoNaoEncontradoError();
    }

    talhao.addPlantio(data.cultura, data.dataPlantio);

    await this.talhoesRepository.save(talhao);
  }
}

