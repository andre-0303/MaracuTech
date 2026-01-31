import { Inject } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';
import { CLIENTES_REPOSITORY } from '../../domain/repositories/clientes.repository';

interface CreateClienteRequest {
  nome: string;
  email: string;
  telefone: string;
}

export class CreateClienteUseCase {
  constructor(
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async execute(data: CreateClienteRequest): Promise<Cliente> {
    const clienteExistente =
      await this.clientesRepository.findByEmail(data.email);

    if (clienteExistente) {
      throw new Error('Cliente já cadastrado com este email');
    }

    const cliente = Cliente.create({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
    });

    await this.clientesRepository.create(cliente);

    return cliente;
  }
}