import { FaseCultivo } from './fase-cultivo.enum';
import { Colheita } from './colheita.entity';
import { Quantidade } from '../shared/value-objects/quantidade.vo';

export class Plantio {
  private colheitas: Colheita[] = [];
  private faseAtual: FaseCultivo = FaseCultivo.PLANTADO;

  constructor(
    readonly id: string,
    readonly variedade: string,
    readonly dataPlantio: Date,
    readonly quantidadeMudas: Quantidade,
  ) {}

  getFaseAtual(): FaseCultivo {
    return this.faseAtual;
  }

  avancarFase() {
    const ordem = Object.values(FaseCultivo);
    const indiceAtual = ordem.indexOf(this.faseAtual);

    if (this.faseAtual === FaseCultivo.ENCERRADO) {
      throw new Error('Plantio já encerrado');
    }

    this.faseAtual = ordem[indiceAtual + 1];
  }

  registrarColheita(colheita: Colheita) {
    if (this.faseAtual !== FaseCultivo.FRUTIFICACAO) {
      throw new Error('Colheita só permitida na fase de frutificação');
    }

    this.colheitas.push(colheita);
  }

  getColheitas(): Colheita[] {
    return this.colheitas;
  }
}
