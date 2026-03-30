import {
  ClientesRepository,
  FindAllClientesFilters,
} from '../../domain/repositories/clientes.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

export class InMemoryClientesRepository implements ClientesRepository {
  private clientes: Cliente[] = [];

  async create(cliente: Cliente): Promise<void> {
    this.clientes.push(cliente);
  }

  async save(cliente: Cliente): Promise<void> {
    const index = this.clientes.findIndex((c) => c.id === cliente.id);

    if (index >= 0) {
      this.clientes[index] = cliente;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index >= 0) {
      this.clientes.splice(index, 1);
    }
  }

  async findById(id: string): Promise<Cliente | null> {
    return this.clientes.find((c) => c.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    return this.clientes.find((c) => c.email === email) ?? null;
  }

  async findAll(filters?: FindAllClientesFilters): Promise<Cliente[]> {
    let resultados = this.clientes;

    if (filters?.ativo !== undefined) {
      resultados = resultados.filter((c) => c.ativo === filters.ativo);
    }

    if (filters?.nome) {
      resultados = resultados.filter((c) =>
        c.nome.toLowerCase().includes(filters.nome!.toLowerCase()),
      );
    }

    if (filters?.email) {
      resultados = resultados.filter((c) =>
        c.email.toLowerCase().includes(filters.email!.toLowerCase()),
      );
    }

    return resultados;
  }

  async findByProdutorId(produtorId: string): Promise<Cliente[]> {
    return this.clientes.filter((c) => c.produtorId === produtorId);
  }
}
