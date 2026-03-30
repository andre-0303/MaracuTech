import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { AuthResponse } from './graphql/models/auth-response.model';
import { CurrentUser } from './decorators/current-user.decorator';
import { ClienteModel } from '../auth/clients/infra/graphql/models/cliente.model';
import { CLIENTES_REPOSITORY } from '../auth/clients/domain/repositories/clientes.repository';
import type { ClientesRepository } from '../auth/clients/domain/repositories/clientes.repository';
import { ClienteMapper } from '../auth/clients/infra/graphql/mappers/cliente.mapper';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository,
  ) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const result = await this.authService.login(email, password);
    return { accessToken: result.accessToken };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  protectedHello() {
    return 'Você está autenticado';
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ClienteModel, { nullable: true })
  async me(@CurrentUser() user: { userId: string }) {
    const cliente = await this.clientesRepository.findById(user.userId);
    if (!cliente) return null;

    const modelo = ClienteMapper.toModel(cliente);
    const clientes = await this.clientesRepository.findByProdutorId(cliente.id);
    modelo.clientes = ClienteMapper.toModels(clientes);

    return modelo;
  }
}
