import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class ListTalhoesByClienteArgs {
  @Field(() => ID)
  clienteId: string;
}

