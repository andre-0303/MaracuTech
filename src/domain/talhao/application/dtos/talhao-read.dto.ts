export interface TalhaoReadDTO {
  id: string;
  nome: string;
  area: number;
  localizacao: string;
  totalPlantios: number;
  clienteId: string;
  ativo: boolean;
  createdAt: Date;
}

