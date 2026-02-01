import { Inject, Injectable } from '@nestjs/common';
import { CLIENTES_REPOSITORY } from '../../domain/repositories/clientes.repository';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';
import { ListClientesArgs } from '../../presentation/graphql/args/list-clientes.args';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class ListClientesUseCase {
  constructor(
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async execute(filters: ListClientesArgs): Promise<Cliente[]> {
    const {ativo, nome, email} = filters;

    return this.clientesRepository.findAll({
      ativo,
      nome,
      email,
    });
  }
}
