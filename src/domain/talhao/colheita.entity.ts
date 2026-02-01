import { Quantidade } from '../shared/value-objects/quantidade.vo';

export class Colheita {
  constructor(
    readonly id: string,
    readonly data: Date,
    readonly quantidade: Quantidade,
  ) {}
}
