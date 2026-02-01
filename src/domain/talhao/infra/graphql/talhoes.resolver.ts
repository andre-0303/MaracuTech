import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CreateTalhaoUseCase } from '../../application/use-cases/create-talhao/create-talhao.use-case';
import { CreateTalhaoInput } from '../inputs/create-talhao.input';
import { TalhaoModel } from './models/talhao.model';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => TalhaoModel)
export class TalhoesResolver {
  constructor(private readonly createTalhaoUseCase: CreateTalhaoUseCase) {}

  @Mutation(() => TalhaoModel)
  async createTalhao(@Args('input') input: CreateTalhaoInput) {
    const talhao = await this.createTalhaoUseCase.execute(input);
    return {
      id: talhao.id,
      clienteId: talhao.clienteId,
      nome: talhao.nome,
      area: talhao.area.getValue(),
      localizacao: talhao.localizacao,
      ativo: true,
      createdAt: talhao.createdAt,
    };
  }
}

