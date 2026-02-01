import { Inject } from '@nestjs/common';
import type { ClientesRepository } from '../../domain/repositories/clientes.repository'; // <-- import type
import { CLIENTES_REPOSITORY } from '../../domain/repositories/clientes.repository';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { ListClientesUseCase } from '../../application/use-cases/list-clientes.use-case';
import { CreateClienteInput } from './inputs/create-cliente.input';
import { ClienteModel } from './models/cliente.model';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { ListClientesArgs } from '../../presentation/graphql/args/list-clientes.args';
import { ClienteMapper } from './mappers/cliente.mapper';

@UseGuards(GqlAuthGuard)
@Resolver(() => ClienteModel)
export class ClientesResolver {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly listClientesUseCase: ListClientesUseCase,
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository, // <-- agora funciona
  ) {}

  @Mutation(() => ClienteModel)
  async createCliente(@Args('input') input: CreateClienteInput) {
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
  async listClientes(@Args() args: ListClientesArgs): Promise<ClienteModel[]> {
    const clientes = await this.listClientesUseCase.execute(args);
    return ClienteMapper.toModels(clientes);
  }

  @Query(() => [ClienteModel], { name: 'findClientes' })
  async findClientes(
    @Args('ativo', { type: () => Boolean, nullable: true }) ativo?: boolean,
    @Args('nome', { type: () => String, nullable: true }) nome?: string,
    @Args('email', { type: () => String, nullable: true }) email?: string,
  ): Promise<ClienteModel[]> {
    const clientes = await this.clientesRepository.findAll({ ativo, nome, email });
    return ClienteMapper.toModels(clientes);
  }
}
