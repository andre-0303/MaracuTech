import { Inject } from '@nestjs/common';
import type { PlantiosReadRepository } from '../../queries/plantios-read.repository';
import type { PlantioReadDTO } from '../../dtos/plantio-read.dto';

export class ListPlantiosByTalhaoUseCase {
  constructor(
    @Inject('PlantiosReadRepository')
    private readonly plantiosReadRepository: PlantiosReadRepository,
  ) {}

  async execute(talhaoId: string): Promise<PlantioReadDTO[]> {
    return this.plantiosReadRepository.findByTalhaoId(talhaoId);
  }
}
