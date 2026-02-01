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
