import { Module } from '@nestjs/common';

import { ClientesResolver } from './infra/graphql/clientes.resolver';
import { CreateClienteUseCase } from './application/use-cases/create-cliente.use-case';
import { InMemoryClientesRepository } from './infra/repositories/in-memory-clientes.repository';
import { CLIENTES_REPOSITORY } from './domain/repositories/clientes-repository.token';
import { ListClientesUseCase } from './application/use-cases/list-clientes.use-case';

@Module({
  providers: [
    ClientesResolver,
    CreateClienteUseCase,
    ListClientesUseCase,
    {
      provide: CLIENTES_REPOSITORY,
      useClass: InMemoryClientesRepository,
    },
  ],
})
export class ClientesModule {}
