import { randomUUID } from 'crypto';
import { Area } from '../shared/value-objects/area.vo';
import { Plantio } from './plantio.entity';
import { Localizacao } from '../shared/value-objects/localizacao.vo';
import { FaseCultivo } from './domain/enums/fase-cultivo.enum';

interface TalhaoProps {
  clienteId: string;
  nome: string;
  area: Area;
  localizacao: Localizacao;
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
    localizacao: Localizacao,
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
    localizacao?: Localizacao;
  }) {
    if (data.nome) this.props.nome = data.nome;
    if (data.area) this.props.area = data.area;
    if (data.localizacao) this.props.localizacao = data.localizacao;
  }

  addPlantio(cultura: string, dataPlantio: Date): Plantio {
    const existeAtivo = this._plantios.some(
      (p) => p.cultura === cultura && p.ativo,
    );

    if (existeAtivo) {
      throw new Error(
        'Já existe um plantio ativo dessa cultura neste talhão',
      );
    }

    const plantio = Plantio.create(cultura, dataPlantio);
    this._plantios.push(plantio);
    return plantio;
  }

  advanceFasePlantio(plantioId: string, novaFase: FaseCultivo) {
    const plantio = this._plantios.find((p) => p.id === plantioId);

    if (!plantio) {
      throw new Error('Plantio não encontrado neste talhão');
    }

    plantio.advanceFase(novaFase);
  }

  static restore(props: {
    id: string;
    clienteId: string;
    nome: string;
    area: Area;
    localizacao: Localizacao;
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

  get localizacao(): Localizacao {
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
}

