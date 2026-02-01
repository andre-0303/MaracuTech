import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class TalhaoModel {
  @Field(() => ID)
  id: string;

  @Field()
  clienteId: string;

  @Field()
  nome: string;

  @Field(() => Float)
  area: number;

  @Field()
  localizacao: string;

  @Field()
  ativo: boolean;

  @Field()
  createdAt: Date;
}

