import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../../../auth/guard/gql-auth.guard';

import { TalhaoModel } from '../../presentation/graphql/models/talhao.model';
import { PlantioModel } from '../../presentation/graphql/models/plantio.model';
import { CreateTalhaoInput } from './inputs/create-talhao.input';
import { CreatePlantioInput } from './inputs/create-plantio.input';
import { AdvanceFasePlantioInput } from './inputs/advance-fase-plantio.input';
import { RegisterColheitaInput } from './inputs/register-colheita.input';

import { ListTalhoesUseCase } from '../../application/use-cases/list-talhoes/list-talhoes.use-case';
import { CreateTalhaoUseCase } from '../../application/use-cases/create-talhao/create-talhao.use-case';
import { GetTalhaoByIdUseCase } from '../../application/use-cases/get-talhao-by-id/get-talhao-by-id.use-case';
import { ListTalhoesByClienteUseCase } from '../../application/use-cases/list-talhoes-by-cliente/list-talhoes-by-cliente.use-case';
import { ListPlantiosByTalhaoUseCase } from '../../application/use-cases/list-plantios-by-talhao/list-plantios-by-talhao.use-case';
import { CreatePlantioUseCase } from '../../application/use-cases/create-plantio/create-plantio.use-case';
import { AdvanceFasePlantioUseCase } from '../../application/use-cases/advance-fase-plantio/advance-fase-plantio.use-case';
import { RegisterColheitaUseCase } from '../../application/use-cases/register-colheita/register-colheita.use-case';
import { ColheitaModel } from '../../presentation/graphql/models/colheita.model';
import { ListColheitasByPlantioUseCase } from '../../application/use-cases/list-colheitas-by-plantio/list-colheitas-by-plantio.use-case';

@UseGuards(GqlAuthGuard)
@Resolver(() => TalhaoModel)
export class TalhoesResolver {
  constructor(
    private readonly listTalhoesUseCase: ListTalhoesUseCase,
    private readonly createTalhaoUseCase: CreateTalhaoUseCase,
    private readonly getTalhaoByIdUseCase: GetTalhaoByIdUseCase,
    private readonly listTalhoesByClienteUseCase: ListTalhoesByClienteUseCase,
    private readonly listPlantiosByTalhaoUseCase: ListPlantiosByTalhaoUseCase,
    private readonly listColheitasByPlantioUseCase: ListColheitasByPlantioUseCase,
    private readonly createPlantioUseCase: CreatePlantioUseCase,
    private readonly advanceFasePlantioUseCase: AdvanceFasePlantioUseCase,
    private readonly registerColheitaUseCase: RegisterColheitaUseCase,
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

  @Query(() => [ColheitaModel])
  async listColheitas(@Args('plantioId') plantioId: string) {
    const colheitas = await this.listColheitasByPlantioUseCase.execute(
      plantioId,
    );

    return colheitas.map((c) => ({
      id: c.id,
      data: c.data,
      quantidade: c.quantidade,
    }));
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
      localizacao: t.localizacao.getValue(),
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
      localizacao: talhao.localizacao.getValue(),
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
      localizacao: talhao.localizacao.getValue(),
      ativo: talhao.ativo,
      createdAt: talhao.createdAt,
    };
  }

  @Mutation(() => PlantioModel)
  async createPlantio(@Args('input') input: CreatePlantioInput) {
    await this.createPlantioUseCase.execute({
      talhaoId: input.talhaoId,
      clienteId: input.clienteId,
      cultura: input.variedade,
      dataPlantio: new Date(input.dataPlantio),
    });

    const plantios = await this.listPlantiosByTalhaoUseCase.execute(
      input.talhaoId,
    );

    // return last plantio created
    const last = plantios[plantios.length - 1];
    return last;
  }

  @Mutation(() => PlantioModel)
  async advanceFasePlantio(@Args('input') input: AdvanceFasePlantioInput) {
    await this.advanceFasePlantioUseCase.execute({
      talhaoId: input.talhaoId,
      clienteId: input.clienteId,
      plantioId: input.plantioId,
      novaFase: input.novaFase,
    });

    const plantios = await this.listPlantiosByTalhaoUseCase.execute(
      input.talhaoId,
    );

    return plantios.find((p) => p.id === input.plantioId) as any;
  }

  @Mutation(() => ColheitaModel)
  async registerColheita(@Args('input') input: RegisterColheitaInput) {
    const created = await this.registerColheitaUseCase.execute({
      plantioId: input.plantioId,
      data: new Date(input.data),
      quantidade: input.quantidade,
    });

    return {
      id: created.id,
      data: created.data,
      quantidade: created.quantidade,
    };
  }
}
