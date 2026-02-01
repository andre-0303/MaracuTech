import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateClienteInput {
  @Field()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  telefone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
