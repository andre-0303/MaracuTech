import { Talhao } from 'src/domain/talhao/talhao.entity';
import { Area } from 'src/domain/shared/value-objects/area.vo';
import { Quantidade } from 'src/domain/shared/value-objects/quantidade.vo';
import { Plantio } from 'src/domain/talhao/plantio.entity';
import { Colheita } from 'src/domain/talhao/colheita.entity';

import { TalhaoOrmEntity } from '../entities/talhao.orm-entity';

export class TalhaoMapper {
  static toDomain(orm: TalhaoOrmEntity): Talhao {
    const talhao = Talhao.restore({
      id: orm.id,
      clienteId: orm.clienteId,
      nome: orm.nome,
      area: new Area(orm.area),
      localizacao: orm.localizacao,
      ativo: orm.ativo,
      createdAt: orm.createdAt,
      plantios: orm.plantios?.map((p) => {
        const plantio = new Plantio(
          p.id,
          p.variedade,
          p.dataPlantio,
          new Quantidade(p.quantidadeMudas),
        );

        (plantio as any).faseAtual = p.faseAtual;

        p.colheitas?.forEach((c) => {
          plantio.registrarColheita(
            new Colheita(c.id, c.data, new Quantidade(c.quantidade)),
          );
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
      localizacao: talhao.localizacao,
      ativo: talhao.ativo,
      createdAt: talhao.createdAt,
      plantios: talhao.getPlantios().map((p) => ({
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
