import { Inject } from '@nestjs/common';
import type { TalhoesReadRepository } from '../../queries/talhoes-read.repository';
import type { TalhaoReadDTO } from '../../dtos/talhao-read.dto';

export class ListTalhoesByClienteUseCase {
  constructor(
    @Inject('TalhoesReadRepository')
    private readonly talhoesReadRepository: TalhoesReadRepository,
  ) {}

  async execute(clienteId: string): Promise<TalhaoReadDTO[]> {
    return this.talhoesReadRepository.findByClienteId(clienteId);
  }
}
