import { Injectable, NotFoundException } from '@nestjs/common';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';

@Injectable()
export class DeleteClienteUseCase {
  constructor(private readonly clientesRepository: ClientesRepository) {}

  async execute(id: string): Promise<void> {
    const cliente = await this.clientesRepository.findById(id);

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    await this.clientesRepository.delete(id);
  }
}
