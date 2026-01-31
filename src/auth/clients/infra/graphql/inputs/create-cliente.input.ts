import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClienteInput {
  @Field()
  nome: string;

  @Field()
  email: string;

  @Field()
  telefone: string;
}
