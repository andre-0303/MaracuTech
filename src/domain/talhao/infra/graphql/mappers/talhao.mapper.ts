import { Talhao } from '../../../talhao.entity';
import { TalhaoModel } from '../models/talhao.model';

export class TalhaoMapper {
  static toModel(talhao: Talhao): TalhaoModel {
    return {
      id: talhao.id,
      clienteId: talhao.clienteId,
      nome: talhao.nome,
      area: talhao.area.getValue(),
      localizacao: talhao.localizacao.getValue(),
      ativo: talhao.ativo,
      createdAt: talhao.createdAt,
    };
  }

  static toModels(talhoes: Talhao[]): TalhaoModel[] {
    return talhoes.map(TalhaoMapper.toModel);
  }
}
