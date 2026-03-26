import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RegisterColheitaInput {
  @Field()
  plantioId: string;

  @Field()
  data: string;

  @Field(() => Int)
  quantidade: number;
}
