import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';
import { CLIENTES_REPOSITORY } from '../../domain/repositories/clientes.repository';
import { UpdateClienteInput } from '../../infra/graphql/inputs/update-cliente.input';

@Injectable()
export class UpdateClienteUseCase {
  constructor(
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async execute(input: UpdateClienteInput) {
    const cliente = await this.clientesRepository.findById(input.id);

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    cliente.update({
      nome: input.nome,
      email: input.email,
      telefone: input.telefone,
      ativo: input.ativo,
    });

    await this.clientesRepository.save(cliente);

    return cliente;
  }
}
