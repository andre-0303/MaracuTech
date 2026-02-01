import { Injectable, NotFoundException } from '@nestjs/common';
import type { TalhoesRepository } from 'src/domain/talhao/domain/repositories/talhoes.repository';
import { Talhao } from 'src/domain/talhao/talhao.entity';

@Injectable()
export class GetTalhaoByIdUseCase {
  constructor(
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

