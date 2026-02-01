import { Talhao } from '../../talhao.entity';

export interface TalhoesRepository {
  create(talhao: Talhao): Promise<void>;

  save(talhao: Talhao): Promise<void>;

  findById(id: string): Promise<Talhao | null>;

  findByClienteId(clienteId: string): Promise<Talhao[]>;

  existsByNomeAndClienteId(nome: string, clienteId: string): Promise<boolean>;

  findAllByCliente(clienteId: string, ativo?: boolean): Promise<Talhao[]>;

  delete(id: string): Promise<void>;
}
