import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { TalhoesRepository } from './talhoes.repository';
import { Talhao } from '../../talhao.entity';
import { TalhaoOrmEntity } from '../../infra/typeorm/entities/talhao.orm-entity';
import { TalhaoMapper } from '../../infra/typeorm/mappers/talhao.mapper';
@Injectable()
export class TypeOrmTalhoesRepository implements TalhoesRepository {
  constructor(private readonly manager: EntityManager) {}

  async create(talhao: Talhao): Promise<void> {
    const ormTalhao = TalhaoMapper.toOrm(talhao);
    await this.manager.save(TalhaoOrmEntity, ormTalhao);
  }

  async save(talhao: Talhao): Promise<void> {
    const ormTalhao = TalhaoMapper.toOrm(talhao);
    await this.manager.save(TalhaoOrmEntity, ormTalhao);
  }

  async findById(id: string): Promise<Talhao | null> {
    const ormTalhao = await this.manager.findOne(TalhaoOrmEntity, {
      where: { id },
      relations: {
        plantios: {
          colheitas: true,
        },
      },
    });

    if (!ormTalhao) {
      return null;
    }

    return TalhaoMapper.toDomain(ormTalhao);
  }

  async findByClienteId(clienteId: string): Promise<Talhao[]> {
    const talhoes = await this.manager.find(TalhaoOrmEntity, {
      where: { clienteId },
      relations: {
        plantios: {
          colheitas: true,
        },
      },
      order: {
        nome: 'ASC',
      },
    });

    return talhoes.map(TalhaoMapper.toDomain);
  }

  async existsByNomeAndClienteId(
    nome: string,
    clienteId: string,
  ): Promise<boolean> {
    const count = await this.manager.count(TalhaoOrmEntity, {
      where: {
        nome,
        clienteId,
      },
    });

    return count > 0;
  }

  async delete(id: string): Promise<void> {
    await this.manager.delete(TalhaoOrmEntity, id);
  }

  async findAllByCliente(
    clienteId: string,
    ativo?: boolean,
  ): Promise<Talhao[]> {
    const where: any = { clienteId };

    if (ativo !== undefined) {
      where.ativo = ativo;
    }

    const talhoes = await this.manager.find(TalhaoOrmEntity, {
      where,
      relations: {
        plantios: {
          colheitas: true,
        },
      },
      order: {
        nome: 'ASC',
      },
    });

    return talhoes.map(TalhaoMapper.toDomain);
  }
}

