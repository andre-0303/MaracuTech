import { Injectable } from '@nestjs/common';

import type { TalhoesRepository } from 'src/domain/talhao/domain/repositories/talhoes.repository';
import { Talhao } from 'src/domain/talhao/talhao.entity';
import { ListTalhoesArgs } from './list-talhoes.args';

@Injectable()
export class ListTalhoesUseCase {
  constructor(
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(args: ListTalhoesArgs): Promise<Talhao[]> {
    return this.talhoesRepository.findAllByCliente(
      args.clienteId,
      args.ativo,
    );
  }
}
