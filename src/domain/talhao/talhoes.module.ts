import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TALHOES_REPOSITORY } from './domain/repositories/talhoes-repository.token';
import { TypeOrmTalhoesRepository } from './domain/repositories/typeorm-talhoes.repository';
import { CreateTalhaoUseCase } from './application/use-cases/create-talhao/create-talhao.use-case';
import { ListTalhoesUseCase } from './application/use-cases/list-talhoes/list-talhoes.use-case';
import { GetTalhaoByIdUseCase } from './application/use-cases/get-talhao-by-id/get-talhao-by-id.use-case';
import { UpdateTalhaoUseCase } from './application/use-cases/update-talhao/update-talhao.use-case';
import { ListTalhoesByClienteUseCase } from './application/use-cases/list-talhoes-by-cliente/list-talhoes-by-cliente.use-case';
import { ListPlantiosByTalhaoUseCase } from './application/use-cases/list-plantios-by-talhao/list-plantios-by-talhao.use-case';
import { CreatePlantioUseCase } from './application/use-cases/create-plantio/create-plantio.use-case';
import { AdvanceFasePlantioUseCase } from './application/use-cases/advance-fase-plantio/advance-fase-plantio.use-case';
import { RegisterColheitaUseCase } from './application/use-cases/register-colheita/register-colheita.use-case';
import { TalhoesResolver } from './infra/graphql/talhoes.resolver';
import { TalhaoOrmEntity } from './infra/typeorm/entities/talhao.orm-entity';
import { PlantioOrmEntity } from './infra/typeorm/entities/plantio.orm-entity';
import { ColheitaOrmEntity } from './infra/typeorm/entities/colheita.orm-entity';
import { TypeOrmTransactionManager } from '../../shared/infra/database/typeorm-transaction-manager';
import { TypeOrmTalhoesReadRepository } from './infra/typeorm/queries/typeorm-talhoes-read.repository';
import { TypeOrmPlantiosReadRepository } from './infra/typeorm/queries/typeorm-plantios-read.repository';
import { TypeOrmColheitasReadRepository } from './infra/typeorm/queries/typeorm-colheitas-read.repository';
import { ListColheitasByPlantioUseCase } from './application/use-cases/list-colheitas-by-plantio/list-colheitas-by-plantio.use-case';

export const TRANSACTION_MANAGER = 'TRANSACTION_MANAGER';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TalhaoOrmEntity,
      PlantioOrmEntity,
      ColheitaOrmEntity,
    ]),
  ],
  providers: [
    TalhoesResolver,
    CreateTalhaoUseCase,
    ListTalhoesUseCase,
    GetTalhaoByIdUseCase,
    UpdateTalhaoUseCase,
    ListTalhoesByClienteUseCase,
    ListPlantiosByTalhaoUseCase,
    ListColheitasByPlantioUseCase,
    CreatePlantioUseCase,
    AdvanceFasePlantioUseCase,
    RegisterColheitaUseCase,
    {
      provide: TALHOES_REPOSITORY,
      useFactory: (dataSource: DataSource) =>
        new TypeOrmTalhoesRepository(dataSource.manager),
      inject: [DataSource],
    },
    {
      provide: 'TalhoesReadRepository',
      useFactory: (dataSource: DataSource) =>
        new TypeOrmTalhoesReadRepository(dataSource.manager),
      inject: [DataSource],
    },
    {
      provide: 'PlantiosReadRepository',
      useFactory: (dataSource: DataSource) =>
        new TypeOrmPlantiosReadRepository(dataSource.manager),
      inject: [DataSource],
    },
    {
      provide: 'ColheitasReadRepository',
      useFactory: (dataSource: DataSource) =>
        new TypeOrmColheitasReadRepository(dataSource.manager),
      inject: [DataSource],
    },
    {
      provide: TRANSACTION_MANAGER,
      useFactory: (dataSource: DataSource) =>
        new TypeOrmTransactionManager(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [
    TALHOES_REPOSITORY,
    TRANSACTION_MANAGER,
    'TalhoesReadRepository',
    'PlantiosReadRepository',
    'ColheitasReadRepository',
  ],
})
export class TalhoesModule {}

