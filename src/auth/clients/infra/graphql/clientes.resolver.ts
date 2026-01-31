import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { ListClientesUseCase } from '../../application/use-cases/list-clientes.use-case';
import { CreateClienteInput } from './inputs/create-cliente.input';
import { ClienteModel } from './models/cliente.model';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => ClienteModel)
export class ClientesResolver {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly listClientesUseCase: ListClientesUseCase,
  ) {}

  @Mutation(() => ClienteModel)
  async createCliente(
    @Args('input') input: CreateClienteInput,
  ) {
    const cliente = await this.createClienteUseCase.execute(input);

    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo,
      createdAt: cliente.createdAt,
    };
  }

  @Query(() => [ClienteModel])
  async listClientes() {
    const clientes = await this.listClientesUseCase.execute();

    return clientes.map((cliente) => ({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo,
      createdAt: cliente.createdAt,
    }));
  }
}
