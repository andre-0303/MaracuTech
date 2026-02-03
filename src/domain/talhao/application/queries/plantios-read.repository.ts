import { PlantioReadDTO } from '../dtos/plantio-read.dto';

export interface PlantiosReadRepository {
  findByTalhaoId(talhaoId: string): Promise<PlantioReadDTO[]>;
}

