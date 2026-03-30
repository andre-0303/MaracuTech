import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ClienteModel {
  @Field(() => ID)
  id: string;

  @Field()
  nome: string;

  @Field()
  email: string;

  @Field()
  telefone: string;

  @Field()
  ativo: boolean;

  @Field()
  createdAt: Date;

  @Field(() => [ClienteModel], { nullable: true })
  clientes?: ClienteModel[];
}
