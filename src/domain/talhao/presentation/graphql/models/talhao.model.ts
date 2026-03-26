import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { PlantioModel } from './plantio.model';

@ObjectType('Talhao')
export class TalhaoModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
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

  @Field(() => [PlantioModel], { nullable: true })
  plantios?: PlantioModel[];
}

