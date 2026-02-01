import { Injectable, Inject } from '@nestjs/common';

import { TALHOES_REPOSITORY } from 'src/domain/talhao/domain/repositories/talhoes-repository.token';
import type { TalhoesRepository } from 'src/domain/talhao/domain/repositories/talhoes.repository';
import { Talhao } from 'src/domain/talhao/talhao.entity';
import { ListTalhoesArgs } from './list-talhoes.args';

@Injectable()
export class ListTalhoesUseCase {
  constructor(
    @Inject(TALHOES_REPOSITORY)
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(args: ListTalhoesArgs): Promise<Talhao[]> {
    return this.talhoesRepository.findAllByCliente(args.clienteId, args.ativo);
  }
}
