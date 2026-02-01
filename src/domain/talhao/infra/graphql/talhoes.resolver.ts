import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';

import { TalhaoModel } from './models/talhao.model';
import { CreateTalhaoInput } from './inputs/create-talhao.input';

import { ListTalhoesUseCase } from '../../application/use-cases/list-talhoes/list-talhoes.use-case';
import { CreateTalhaoUseCase } from '../../application/use-cases/create-talhao/create-talhao.use-case';
import { GetTalhaoByIdUseCase } from '../../application/use-cases/get-talhao-by-id/get-talhao-by-id.use-case';

@UseGuards(GqlAuthGuard)
@Resolver(() => TalhaoModel)
export class TalhoesResolver {
  constructor(
    private readonly listTalhoesUseCase: ListTalhoesUseCase,
    private readonly createTalhaoUseCase: CreateTalhaoUseCase,
    private readonly getTalhaoByIdUseCase: GetTalhaoByIdUseCase,
  ) {}

  @Query(() => [TalhaoModel])
  async listTalhoes(
    @Args('clienteId') clienteId: string,
    @Args('ativo', { nullable: true }) ativo?: boolean,
  ) {
    const talhoes = await this.listTalhoesUseCase.execute({
      clienteId,
      ativo,
    });

    return talhoes.map(t => ({
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
  async getTalhaoById(
    @Args('id') id: string,
  ) {
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
  async createTalhao(
    @Args('input') input: CreateTalhaoInput,
  ) {
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
