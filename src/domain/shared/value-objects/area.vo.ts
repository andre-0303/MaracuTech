export class Area {
    private readonly value: number;

    constructor(value: number) {
        if (value <= 0) {
            throw new Error('Área deve ser maior que zero');
        }
        this.value = value;
    }

    getValue(): number {
        return this.value;
    }
}