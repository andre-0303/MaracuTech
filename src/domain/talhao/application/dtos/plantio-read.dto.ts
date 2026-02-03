import { FaseCultivo } from '../../domain/enums/fase-cultivo.enum';

export interface PlantioReadDTO {
  id: string;
  cultura: string;
  dataPlantio: Date;
  fase: FaseCultivo;
}

