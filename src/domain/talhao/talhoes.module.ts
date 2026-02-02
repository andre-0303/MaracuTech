import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TALHOES_REPOSITORY } from './domain/repositories/talhoes-repository.token';
import { TypeOrmTalhoesRepository } from './domain/repositories/typeorm-talhoes.repository';
import { CreateTalhaoUseCase } from './application/use-cases/create-talhao/create-talhao.use-case';
import { ListTalhoesUseCase } from './application/use-cases/list-talhoes/list-talhoes.use-case';
import { GetTalhaoByIdUseCase } from './application/use-cases/get-talhao-by-id/get-talhao-by-id.use-case';
import { TalhoesResolver } from './infra/graphql/talhoes.resolver';
import { TalhaoOrmEntity } from './infra/typeorm/entities/talhao.orm-entity';
import { PlantioOrmEntity } from './infra/typeorm/entities/plantio.orm-entity';
import { ColheitaOrmEntity } from './infra/typeorm/entities/colheita.orm-entity';
import { TypeOrmTransactionManager } from '../../shared/infra/database/typeorm-transaction-manager';

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
    {
      provide: TALHOES_REPOSITORY,
      useFactory: (manager: any) => new TypeOrmTalhoesRepository(manager),
      inject: ['EntityManager', DataSource],
    },
    {
      provide: TRANSACTION_MANAGER,
      useFactory: (dataSource: DataSource) =>
        new TypeOrmTransactionManager(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [TALHOES_REPOSITORY, TRANSACTION_MANAGER],
})
export class TalhoesModule {}

