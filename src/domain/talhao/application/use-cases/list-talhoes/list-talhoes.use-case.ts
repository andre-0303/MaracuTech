import { Injectable, Inject } from '@nestjs/common';

import { TALHOES_REPOSITORY } from '../../../domain/repositories/talhoes-repository.token';
import type { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { Talhao } from '../../../talhao.entity';
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
