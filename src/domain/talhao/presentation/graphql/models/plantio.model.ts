import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { FaseCultivo } from '../../../domain/enums/fase-cultivo.enum';

registerEnumType(FaseCultivo, { name: 'FaseCultivo' });

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
