import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ClientesResolver } from './infra/graphql/clientes.resolver';
import { CreateClienteUseCase } from './application/use-cases/create-cliente.use-case';
import { UpdateClienteUseCase } from './application/use-cases/update-cliente.use-case';

import { ClienteOrmEntity } from './infra/typeorm/entities/cliente.orm-entity';
import { TypeOrmClientesRepository } from './infra/typeorm/repositories/typeorm-clientes.repository';
import {
  CLIENTES_REPOSITORY,
} from './domain/repositories/clientes.repository';
import { ListClientesUseCase } from './application/use-cases/list-clientes.use-case';
import { TypeOrmTransactionManager } from '../../shared/infra/database/typeorm-transaction-manager';

export const TRANSACTION_MANAGER = 'TRANSACTION_MANAGER';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteOrmEntity])],
  providers: [
    ClientesResolver,

    CreateClienteUseCase,
    ListClientesUseCase,
    UpdateClienteUseCase,

    {
      provide: CLIENTES_REPOSITORY,
      useFactory: (manager: any) => new TypeOrmClientesRepository(manager),
      inject: ['EntityManager', DataSource],
    },
    {
      provide: TRANSACTION_MANAGER,
      useFactory: (dataSource: DataSource) =>
        new TypeOrmTransactionManager(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [CLIENTES_REPOSITORY, TRANSACTION_MANAGER],
})
export class ClientesModule {}

