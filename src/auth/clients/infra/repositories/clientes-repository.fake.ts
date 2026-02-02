import { Cliente } from '../../domain/entities/cliente.entity';
import { ClientesRepository } from '../../domain/repositories/clientes.repository';

export class ClientesRepositoryFake implements ClientesRepository {
  private clientes: Cliente[] = [];

  async create(cliente: Cliente): Promise<void> {
    this.clientes.push(cliente);
  }

  async save(cliente: Cliente): Promise<void> {
    const index = this.clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.clientes[index] = cliente;
    } else {
      this.clientes.push(cliente);
    }
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    return this.clientes.find(c => c.email === email) || null;
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientes;
  }

  async findById(id: string): Promise<Cliente | null> {
    return this.clientes.find(c => c.id === id) || null;
  }

  async update(cliente: Cliente): Promise<void> {
    const index = this.clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.clientes[index] = cliente;
    }
  }

  async delete(id: string): Promise<void> {
    this.clientes = this.clientes.filter(c => c.id !== id);
  }
}
