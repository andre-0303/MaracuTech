import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../../auth/guard/gql-auth.guard';

import { TalhaoModel } from '../../presentation/graphql/models/talhao.model';
import { PlantioModel } from '../../presentation/graphql/models/plantio.model';
import { CreateTalhaoInput } from './inputs/create-talhao.input';

import { ListTalhoesUseCase } from '../../application/use-cases/list-talhoes/list-talhoes.use-case';
import { CreateTalhaoUseCase } from '../../application/use-cases/create-talhao/create-talhao.use-case';
import { GetTalhaoByIdUseCase } from '../../application/use-cases/get-talhao-by-id/get-talhao-by-id.use-case';
import { ListTalhoesByClienteUseCase } from '../../application/use-cases/list-talhoes-by-cliente/list-talhoes-by-cliente.use-case';
import { ListPlantiosByTalhaoUseCase } from '../../application/use-cases/list-plantios-by-talhao/list-plantios-by-talhao.use-case';

@UseGuards(GqlAuthGuard)
@Resolver(() => TalhaoModel)
export class TalhoesResolver {
  constructor(
    private readonly listTalhoesUseCase: ListTalhoesUseCase,
    private readonly createTalhaoUseCase: CreateTalhaoUseCase,
    private readonly getTalhaoByIdUseCase: GetTalhaoByIdUseCase,
    private readonly listTalhoesByClienteUseCase: ListTalhoesByClienteUseCase,
    private readonly listPlantiosByTalhaoUseCase: ListPlantiosByTalhaoUseCase,
  ) {}

  @Query(() => [TalhaoModel])
  async talhoesByCliente(
    @Args('clienteId') clienteId: string,
  ): Promise<TalhaoModel[]> {
    return this.listTalhoesByClienteUseCase.execute(clienteId);
  }

  @Query(() => [PlantioModel])
  async plantiosByTalhao(
    @Args('talhaoId') talhaoId: string,
  ): Promise<PlantioModel[]> {
    return this.listPlantiosByTalhaoUseCase.execute(talhaoId);
  }

  @Query(() => [TalhaoModel])
  async listTalhoes(
    @Args('clienteId') clienteId: string,
    @Args('ativo', { nullable: true }) ativo?: boolean,
  ) {
    const talhoes = await this.listTalhoesUseCase.execute({
      clienteId,
      ativo,
    });

    return talhoes.map((t) => ({
      id: t.id,
      clienteId: t.clienteId,
      nome: t.nome,
      area: t.area.getValue(),
      localizacao: t.localizacao,
      ativo: t.ativo,
      createdAt: t.createdAt,
    }));
  }

  @Query(() => TalhaoModel)
  async getTalhaoById(@Args('id') id: string) {
    const talhao = await this.getTalhaoByIdUseCase.execute(id);

    return {
      id: talhao.id,
      clienteId: talhao.clienteId,
      nome: talhao.nome,
      area: talhao.area.getValue(),
      localizacao: talhao.localizacao,
      ativo: talhao.ativo,
      createdAt: talhao.createdAt,
    };
  }

  @Mutation(() => TalhaoModel)
  async createTalhao(@Args('input') input: CreateTalhaoInput) {
    const talhao = await this.createTalhaoUseCase.execute(input);

    return {
      id: talhao.id,
      clienteId: talhao.clienteId,
      nome: talhao.nome,
      area: talhao.area.getValue(),
      localizacao: talhao.localizacao,
      ativo: talhao.ativo,
      createdAt: talhao.createdAt,
    };
  }
}
