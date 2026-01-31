import { Cliente } from '../entities/cliente.entity';

export interface ClientesRepository {
  create(cliente: Cliente): Promise<void>;
  save(cliente: Cliente): Promise<void>;

  findById(id: string): Promise<Cliente | null>;
  findByEmail(email: string): Promise<Cliente | null>;
  findAll(): Promise<Cliente[]>;
}
    