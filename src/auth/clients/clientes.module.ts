import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientesResolver } from './infra/graphql/clientes.resolver';
import { CreateClienteUseCase } from './application/use-cases/create-cliente.use-case';

import { ClienteOrmEntity } from './infra/typeorm/entities/cliente.orm-entity';
import { TypeOrmClientesRepository } from './infra/typeorm/repositories/typeorm-clientes.repository';
import { CLIENTES_REPOSITORY, ClientesRepository } from './domain/repositories/clientes.repository';
import { ListClientesUseCase } from './application/use-cases/list-clientes.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteOrmEntity]),
  ],
  providers: [
    ClientesResolver,

    CreateClienteUseCase,
    ListClientesUseCase,

    {
      provide: CLIENTES_REPOSITORY,
      useClass: TypeOrmClientesRepository,
    }
  ]
})
export class ClientesModule {}
