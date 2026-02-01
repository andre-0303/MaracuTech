import { Area } from '../shared/value-objects/area.vo';
import { Plantio } from './plantio.entity';
import { Quantidade } from '../shared/value-objects/quantidade.vo';

export class Talhao {
  private plantios: Plantio[] = [];

  private constructor(
    readonly id: string,
    readonly clienteId: string,
    readonly nome: string,
    readonly area: Area,
    readonly localizacao: string,
    readonly ativo: boolean,
    readonly createdAt: Date,
  ) {}

  static create(
    id: string,
    clienteId: string,
    nome: string,
    area: Area,
    localizacao: string,
  ) {
    return new Talhao(
      id,
      clienteId,
      nome,
      area,
      localizacao,
      true,
      new Date(),
    );
  }

  static restore(props: {
    id: string;
    clienteId: string;
    nome: string;
    area: Area;
    localizacao: string;
    ativo: boolean;
    createdAt: Date;
    plantios?: Plantio[];
  }) {
    const talhao = new Talhao(
      props.id,
      props.clienteId,
      props.nome,
      props.area,
      props.localizacao,
      props.ativo,
      props.createdAt,
    );

    talhao.plantios = props.plantios ?? [];
    return talhao;
  }

  criarPlantio(
    id: string,
    variedade: string,
    dataPlantio: Date,
    quantidadeMudas: number,
  ) {
    const plantio = new Plantio(
      id,
      variedade,
      dataPlantio,
      new Quantidade(quantidadeMudas),
    );

    this.plantios.push(plantio);
    return plantio;
  }

  getPlantios(): Plantio[] {
    return this.plantios;
  }
}
