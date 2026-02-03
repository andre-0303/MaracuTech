export class TalhaoNomeDuplicadoError extends Error {
  constructor() {
    super('Já existe um talhão com esse nome para este cliente');
  }
}

