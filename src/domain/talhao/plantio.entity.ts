import { randomUUID } from 'crypto';
import { FaseCultivo } from './domain/enums/fase-cultivo.enum';
import { Quantidade } from '../shared/value-objects/quantidade.vo';
import { Colheita } from './colheita.entity';

interface PlantioProps {
  cultura: string;
  dataPlantio: Date;
  fase: FaseCultivo;
  ativo: boolean;
  quantidadeMudas?: Quantidade;
  colheitas?: Colheita[];
}

export class Plantio {
  private _colheitas: Colheita[] = [];
  private constructor(
    public readonly id: string,
    private props: PlantioProps,
  ) {
    this._colheitas = props.colheitas ?? [];
  }

  static create(cultura: string, dataPlantio: Date, quantidadeMudas?: number): Plantio {
    return new Plantio(randomUUID(), {
      cultura,
      dataPlantio,
      fase: FaseCultivo.PLANTIO,
      ativo: true,
      quantidadeMudas: quantidadeMudas ? new Quantidade(quantidadeMudas) : new Quantidade(1),
      colheitas: [],
    });
  }

  static restore(props: {
    id: string;
    variedade: string;
    dataPlantio: Date;
    quantidadeMudas?: Quantidade;
    faseAtual?: FaseCultivo;
    ativo?: boolean;
    colheitas?: Colheita[];
  }) {
    const plantio = new Plantio(props.id, {
      cultura: props.variedade,
      dataPlantio: props.dataPlantio,
      fase: props.faseAtual ?? FaseCultivo.PLANTIO,
      ativo: props.ativo ?? true,
      quantidadeMudas: props.quantidadeMudas,
      colheitas: props.colheitas ?? [],
    });

    return plantio;
  }

  advanceFase(novaFase: FaseCultivo) {
    if (novaFase <= this.props.fase) {
      throw new Error('Não é permitido retroceder fase do cultivo');
    }

    this.props.fase = novaFase;
  }

  desativar() {
    this.props.ativo = false;
  }

  registrarColheita(colheita: Colheita) {
    this._colheitas.push(colheita);
  }

  get cultura(): string {
    return this.props.cultura;
  }

  // compatibilidade com mapper (variedade)
  get variedade(): string {
    return this.props.cultura;
  }

  get dataPlantio(): Date {
    return this.props.dataPlantio;
  }

  get fase(): FaseCultivo {
    return this.props.fase;
  }

  getFaseAtual(): FaseCultivo {
    return this.props.fase;
  }

  get ativo(): boolean {
    return this.props.ativo;
  }

  get quantidadeMudas(): Quantidade {
    return this.props.quantidadeMudas!;
  }

  getColheitas(): Colheita[] {
    return this._colheitas;
  }
}

