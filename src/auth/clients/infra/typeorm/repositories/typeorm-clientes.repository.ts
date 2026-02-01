import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Cliente } from '../../../domain/entities/cliente.entity';
import type {
  ClientesRepository,
  FindAllClientesFilters,
} from '../../../domain/repositories/clientes.repository';
import { ClienteOrmEntity } from '../entities/cliente.orm-entity';
import { ClienteMapper } from '../mappers/cliente.mapper';

@Injectable()
export class TypeOrmClientesRepository implements ClientesRepository {
  constructor(
    @InjectRepository(ClienteOrmEntity)
    private readonly repository: Repository<ClienteOrmEntity>,
  ) {}

  async create(cliente: Cliente): Promise<void> {
    const ormCliente = this.repository.create({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo,
      createdAt: cliente.createdAt,
    });

    await this.repository.save(ormCliente);
  }

  async save(cliente: Cliente): Promise<void> {
    await this.repository.save({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo,
      createdAt: cliente.createdAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Cliente | null> {
    const ormCliente = await this.repository.findOne({ where: { id } });
    return ormCliente ? this.toDomain(ormCliente) : null;
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const ormCliente = await this.repository.findOne({ where: { email } });
    return ormCliente ? this.toDomain(ormCliente) : null;
  }

  async findAll(filters?: FindAllClientesFilters): Promise<Cliente[]> {
    const queryBuilder = this.repository.createQueryBuilder('cliente');

    if (filters?.ativo !== undefined) {
      queryBuilder.andWhere('cliente.ativo = :ativo', { ativo: filters.ativo });
    }

    if (filters?.nome) {
      queryBuilder.andWhere('LOWER(cliente.nome) LIKE LOWER(:nome)', {
        nome: `%${filters.nome}%`,
      });
    }

    if (filters?.email) {
      queryBuilder.andWhere('LOWER(cliente.email) LIKE LOWER(:email)', {
        email: `%${filters.email}%`,
      });
    }

    const clientes = await queryBuilder.getMany();
    return clientes.map(ClienteMapper.toDomain);
  }

  private toDomain(orm: ClienteOrmEntity): Cliente {
    return Cliente.restore({
      id: orm.id,
      nome: orm.nome,
      email: orm.email,
      telefone: orm.telefone,
      ativo: orm.ativo,
      createdAt: orm.createdAt,
    });
  }
}
