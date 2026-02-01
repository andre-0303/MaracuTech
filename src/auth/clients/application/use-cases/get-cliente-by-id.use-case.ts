import { Injectable, NotFoundException } from '@nestjs/common';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';

@Injectable()
export class GetClienteByIdUseCase {
  constructor(
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async execute(id: string) {
    const cliente = await this.clientesRepository.findById(id);

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return cliente;
  }
}
