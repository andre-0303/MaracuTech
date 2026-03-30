import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { Cliente } from '../../../domain/entities/cliente.entity';
import type {
  ClientesRepository,
  FindAllClientesFilters,
} from '../../../domain/repositories/clientes.repository';
import { ClienteOrmEntity } from '../entities/cliente.orm-entity';
import { ClienteMapper } from '../mappers/cliente.mapper';

@Injectable()
export class TypeOrmClientesRepository implements ClientesRepository {
  constructor(private readonly manager: EntityManager) {}

  async create(cliente: Cliente): Promise<void> {
    await this.manager.save(ClienteOrmEntity, {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo,
      createdAt: cliente.createdAt,
      produtorId: cliente.produtorId,
    });
  }

  async save(cliente: Cliente): Promise<void> {
    await this.manager.save(ClienteOrmEntity, {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo,
      createdAt: cliente.createdAt,
      produtorId: cliente.produtorId,
    });
  }

  async delete(id: string): Promise<void> {
    await this.manager.delete(ClienteOrmEntity, id);
  }

  async findById(id: string): Promise<Cliente | null> {
    const ormCliente = await this.manager.findOne(ClienteOrmEntity, {
      where: { id },
    });
    return ormCliente ? this.toDomain(ormCliente) : null;
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const ormCliente = await this.manager.findOne(ClienteOrmEntity, {
      where: { email },
    });
    return ormCliente ? this.toDomain(ormCliente) : null;
  }

  async findAll(filters?: FindAllClientesFilters): Promise<Cliente[]> {
    const queryBuilder = this.manager.createQueryBuilder(
      ClienteOrmEntity,
      'cliente',
    );

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

  async findByProdutorId(produtorId: string): Promise<Cliente[]> {
    const clientes = await this.manager.find(ClienteOrmEntity, {
      where: { produtorId },
    });
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
