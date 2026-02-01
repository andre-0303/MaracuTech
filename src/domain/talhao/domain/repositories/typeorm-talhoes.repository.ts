import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TalhoesRepository } from './talhoes.repository';
import { Talhao } from '../../talhao.entity';
import { TalhaoOrmEntity } from '../../infra/typeorm/entities/talhao.orm-entity';
import { TalhaoMapper } from '../../infra/typeorm/mappers/talhao.mapper';

@Injectable()
export class TypeOrmTalhoesRepository implements TalhoesRepository {
  constructor(
    @InjectRepository(TalhaoOrmEntity)
    private readonly repository: Repository<TalhaoOrmEntity>,
  ) {}
  
  async create(talhao: Talhao): Promise<void>{
    const ormTalhao = TalhaoMapper.toOrm(talhao);
    await this.repository.save(ormTalhao);
  }
    async save(talhao: Talhao): Promise<void> {
    const ormTalhao = TalhaoMapper.toOrm(talhao);
    await this.repository.save(ormTalhao);
  }

    async findById(id: string): Promise<Talhao | null> {
    const ormTalhao = await this.repository.findOne({
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

    async findAllByCliente(clienteId: string): Promise<Talhao[]> {
    const talhoes = await this.repository.find({
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
    async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

}