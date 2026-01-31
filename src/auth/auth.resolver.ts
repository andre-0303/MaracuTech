import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guard/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const result = this.authService.login(email, password);
    return result.accessToken;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  protectedHello() {
    return 'Você está autenticado';
  }
}
