import { TalhaoReadDTO } from '../dtos/talhao-read.dto';

export interface TalhoesReadRepository {
  findByClienteId(clienteId: string): Promise<TalhaoReadDTO[]>;
}

