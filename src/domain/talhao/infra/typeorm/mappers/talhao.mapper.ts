import { Talhao } from '../../../talhao.entity';
import { Area } from '../../../../shared/value-objects/area.vo';
import { Quantidade } from '../../../../shared/value-objects/quantidade.vo';
import { Plantio } from '../../../plantio.entity';
import { Colheita } from '../../../colheita.entity';
import { Localizacao } from '../../../../shared/value-objects/localizacao.vo';

import { TalhaoOrmEntity } from '../entities/talhao.orm-entity';

export class TalhaoMapper {
  static toDomain(orm: TalhaoOrmEntity): Talhao {
    const talhao = Talhao.restore({
      id: orm.id,
      clienteId: orm.clienteId,
      nome: orm.nome,
      area: new Area(orm.area),
      localizacao: new Localizacao(orm.localizacao),
      ativo: orm.ativo,
      createdAt: orm.createdAt,
      plantios: orm.plantios?.map((p) => {
        const plantio = Plantio.restore({
          id: p.id,
          variedade: p.variedade,
          dataPlantio: p.dataPlantio,
          quantidadeMudas: new Quantidade(p.quantidadeMudas),
          faseAtual: p.faseAtual,
          ativo: true,
          colheitas: p.colheitas?.map((c) => new Colheita(c.id, c.data, new Quantidade(c.quantidade))) ?? [],
        });

        return plantio;
      }),
    });

    return talhao;
  }

  static toOrm(talhao: Talhao): TalhaoOrmEntity {
    return {
      id: talhao.id,
      clienteId: talhao.clienteId,
      nome: talhao.nome,
      area: talhao.area.getValue(),
      localizacao: talhao.localizacao.getValue(),
      ativo: talhao.ativo,
      createdAt: talhao.createdAt,
      plantios: talhao.plantios.map((p) => ({
        id: p.id,
        variedade: p.variedade,
        dataPlantio: p.dataPlantio,
        quantidadeMudas: p.quantidadeMudas.getValue(),
        faseAtual: p.getFaseAtual(),
        colheitas: p.getColheitas().map((c) => ({
          id: c.id,
          data: c.data,
          quantidade: c.quantidade.getValue(),
        })),
      })),
    } as TalhaoOrmEntity;
  }
}
