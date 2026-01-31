import { Area } from '../shared/value-objects/area.vo';
import { Plantio } from './plantio.entity';
import { Quantidade } from '../shared/value-objects/quantidade.vo';

export class Talhao {
  private plantios: Plantio[] = [];

  constructor(
    readonly id: string,
    readonly nome: string,
    readonly area: Area,
    readonly localizacao: string,
  ) {}

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
