import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

@ObjectType('Talhao')
export class TalhaoModel {
  @Field(() => ID)
  id: string;

  @Field()
  nome: string;

  @Field(() => Float)
  area: number;

  @Field()
  localizacao: string;
}

