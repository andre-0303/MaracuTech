import { Inject } from '@nestjs/common';
import type { ColheitasReadRepository } from '../../queries/colheitas-read.repository';
import type { ColheitaReadDTO } from '../../dtos/colheita-read.dto';

export class ListColheitasByPlantioUseCase {
  constructor(
    @Inject('ColheitasReadRepository')
    private readonly colheitasReadRepository: ColheitasReadRepository,
  ) {}

  async execute(plantioId: string): Promise<ColheitaReadDTO[]> {
    return this.colheitasReadRepository.findByPlantioId(plantioId);
  }
}
