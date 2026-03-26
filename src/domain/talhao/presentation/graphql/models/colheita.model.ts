import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ColheitaModel {
  @Field(() => ID)
  id: string;

  @Field()
  data: Date;

  @Field()
  quantidade: number;
}
