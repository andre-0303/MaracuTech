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
import { TalhoesResolver } from './infra/graphql/talhoes.resolver';
import { TalhaoOrmEntity } from './infra/typeorm/entities/talhao.orm-entity';
import { PlantioOrmEntity } from './infra/typeorm/entities/plantio.orm-entity';
import { ColheitaOrmEntity } from './infra/typeorm/entities/colheita.orm-entity';
import { TypeOrmTransactionManager } from '../../shared/infra/database/typeorm-transaction-manager';
import { TypeOrmTalhoesReadRepository } from './infra/typeorm/queries/typeorm-talhoes-read.repository';
import { TypeOrmPlantiosReadRepository } from './infra/typeorm/queries/typeorm-plantios-read.repository';

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
    CreatePlantioUseCase,
    AdvanceFasePlantioUseCase,
    {
      provide: TALHOES_REPOSITORY,
      useFactory: (manager: any) => new TypeOrmTalhoesRepository(manager),
      inject: ['EntityManager', DataSource],
    },
    {
      provide: 'TalhoesReadRepository',
      useFactory: (manager: any) =>
        new TypeOrmTalhoesReadRepository(manager),
      inject: ['EntityManager', DataSource],
    },
    {
      provide: 'PlantiosReadRepository',
      useFactory: (manager: any) =>
        new TypeOrmPlantiosReadRepository(manager),
      inject: ['EntityManager', DataSource],
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
  ],
})
export class TalhoesModule {}

