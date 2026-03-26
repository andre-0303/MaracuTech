import { InputType, Field } from '@nestjs/graphql';
import { FaseCultivo } from '../../../domain/enums/fase-cultivo.enum';

@InputType()
export class AdvanceFasePlantioInput {
  @Field()
  talhaoId: string;

  @Field()
  clienteId: string;

  @Field()
  plantioId: string;

  @Field(() => FaseCultivo)
  novaFase: FaseCultivo;
}
