import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTalhaoInput {
  @Field()
  clienteId: string;

  @Field()
  nome: string;

  @Field(() => Float)
  area: number;

  @Field()
  localizacao: string;
}

