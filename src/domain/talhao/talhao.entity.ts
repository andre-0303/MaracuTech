import { Area } from '../shared/value-objects/area.vo';
import { Plantio } from './plantio.entity';
import { Quantidade } from '../shared/value-objects/quantidade.vo';

interface TalhaoProps {
  clienteId: string;
  nome: string;
  area: Area;
  localizacao: string;
  ativo: boolean;
  createdAt: Date;
}

export class Talhao {
  private _plantios: Plantio[] = [];
  private props: TalhaoProps;

  private constructor(
    readonly id: string,
    props: TalhaoProps,
  ) {
    this.props = props;
  }

  static create(
    id: string,
    clienteId: string,
    nome: string,
    area: Area,
    localizacao: string,
  ) {
    return new Talhao(id, {
      clienteId,
      nome,
      area,
      localizacao,
      ativo: true,
      createdAt: new Date(),
    });
  }

  update(data: {
    nome?: string;
    area?: Area;
    localizacao?: string;
  }) {
    if (data.nome) this.props.nome = data.nome;
    if (data.area) this.props.area = data.area;
    if (data.localizacao) this.props.localizacao = data.localizacao;
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
    const talhao = new Talhao(props.id, {
      clienteId: props.clienteId,
      nome: props.nome,
      area: props.area,
      localizacao: props.localizacao,
      ativo: props.ativo,
      createdAt: props.createdAt,
    });

    talhao._plantios = props.plantios ?? [];
    return talhao;
  }

  get clienteId(): string {
    return this.props.clienteId;
  }

  get nome(): string {
    return this.props.nome;
  }

  get area(): Area {
    return this.props.area;
  }

  get localizacao(): string {
    return this.props.localizacao;
  }

  get ativo(): boolean {
    return this.props.ativo;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get plantios(): Plantio[] {
    return this._plantios;
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

    this._plantios.push(plantio);
    return plantio;
  }
}
