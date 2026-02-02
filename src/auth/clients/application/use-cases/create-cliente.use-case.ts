import { Injectable } from '@nestjs/common';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

interface CreateClienteRequest {
  nome: string;
  email: string;
  telefone: string;
}

@Injectable()
export class CreateClienteUseCase {
  constructor(
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async execute(data: CreateClienteRequest): Promise<Cliente> {
    const clienteExistente = await this.clientesRepository.findByEmail(data.email);

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

