import { Cliente } from '../entities/cliente.entity';

export const CLIENTES_REPOSITORY = 'CLIENTES_REPOSITORY';

export interface FindAllClientesFilters {
  ativo?: boolean;
  nome?: string;
  email?: string;
}

export interface ClientesRepository {
  create(cliente: Cliente): Promise<void>;
  save(cliente: Cliente): Promise<void>;
  findById(id: string): Promise<Cliente | null>;
  findByEmail(email: string): Promise<Cliente | null>;
  findAll(filters?: FindAllClientesFilters): Promise<Cliente[]>;
}
