import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class ListClientesArgs {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  nome?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  email?: string;
}
