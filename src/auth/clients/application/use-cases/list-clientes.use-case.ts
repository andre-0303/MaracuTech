import { Inject } from '@nestjs/common';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';
import { CLIENTES_REPOSITORY } from '../../domain/repositories/clientes-repository.token';
import { Cliente } from '../../domain/entities/cliente.entity';

export class ListClientesUseCase {
  constructor(
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async execute(): Promise<Cliente[]> {
    const clientes = await this.clientesRepository.findAll();

    return clientes;
  }
}
