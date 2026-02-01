import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TALHOES_REPOSITORY } from './domain/repositories/talhoes-repository.token';
import { TypeOrmTalhoesRepository } from './domain/repositories/typeorm-talhoes.repository';
import { CreateTalhaoUseCase } from './application/use-cases/create-talhao/create-talhao.use-case';
import { TalhoesResolver } from './infra/graphql/talhoes.resolver';
import { TalhaoOrmEntity } from './infra/typeorm/entities/talhao.orm-entity';
import { PlantioOrmEntity } from './infra/typeorm/entities/plantio.orm-entity';
import { ColheitaOrmEntity } from './infra/typeorm/entities/colheita.orm-entity';

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
    {
      provide: TALHOES_REPOSITORY,
      useClass: TypeOrmTalhoesRepository,
    },
  ],
  exports: [TALHOES_REPOSITORY],
})
export class TalhoesModule {}

