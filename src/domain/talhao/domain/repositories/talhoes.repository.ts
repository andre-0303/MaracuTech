import { Talhao } from "../../talhao.entity";   

export interface TalhoesRepository {
    create(talhao: Talhao): Promise<void>;

  save(talhao: Talhao): Promise<void>;
  
  findById(id: string): Promise<Talhao | null>;

  findAllByCliente(clienteId: string): Promise<Talhao[]>;

  delete(id: string): Promise<void>;
}
  
export const TALHOES_REPOSITORY = Symbol('TALHOES_REPOSITORY');