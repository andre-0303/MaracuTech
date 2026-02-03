export class Localizacao {
  constructor(readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Localização não pode ser vazia');
    }
  }

  getValue(): string {
    return this.value;
  }
}

