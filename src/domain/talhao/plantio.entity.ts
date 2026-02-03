import { randomUUID } from 'crypto';
import { FaseCultivo } from './domain/enums/fase-cultivo.enum';

interface PlantioProps {
  cultura: string;
  dataPlantio: Date;
  fase: FaseCultivo;
  ativo: boolean;
}

export class Plantio {
  private constructor(
    public readonly id: string,
    private props: PlantioProps,
  ) {}

  static create(cultura: string, dataPlantio: Date): Plantio {
    return new Plantio(randomUUID(), {
      cultura,
      dataPlantio,
      fase: FaseCultivo.PLANTIO,
      ativo: true,
    });
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

  get cultura(): string {
    return this.props.cultura;
  }

  get dataPlantio(): Date {
    return this.props.dataPlantio;
  }

  get fase(): FaseCultivo {
    return this.props.fase;
  }

  get ativo(): boolean {
    return this.props.ativo;
  }
}

