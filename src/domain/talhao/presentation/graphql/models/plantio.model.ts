import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { FaseCultivo } from '../../../domain/enums/fase-cultivo.enum';

@ObjectType()
export class PlantioModel {
  @Field(() => ID)
  id: string;

  @Field()
  cultura: string;

  @Field()
  dataPlantio: Date;

  @Field(() => FaseCultivo)
  fase: FaseCultivo;
}
