import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { AuthResponse } from './graphql/models/auth-response.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  login(@Args('email') email: string, @Args('password') password: string) {
    const result = this.authService.login(email, password);
    return { accessToken: result.accessToken };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  protectedHello() {
    return 'Você está autenticado';
  }
}
