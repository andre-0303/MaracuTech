import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePlantioInput {
  @Field()
  talhaoId: string;

  @Field()
  clienteId: string;

  @Field()
  variedade: string;

  @Field()
  dataPlantio: string;

  @Field(() => Int, { nullable: true })
  quantidadeMudas?: number;
}
