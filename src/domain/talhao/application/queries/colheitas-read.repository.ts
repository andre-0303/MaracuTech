import { ColheitaReadDTO } from '../dtos/colheita-read.dto';

export interface ColheitasReadRepository {
  findByPlantioId(plantioId: string): Promise<ColheitaReadDTO[]>;
}
