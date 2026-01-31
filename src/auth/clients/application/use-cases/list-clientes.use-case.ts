import { Inject, Injectable } from '@nestjs/common';
import { CLIENTES_REPOSITORY } from '../../domain/repositories/clientes.repository';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';

@Injectable()
export class ListClientesUseCase {
  constructor(
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async execute() {
    return this.clientesRepository.findAll();
  }
}
