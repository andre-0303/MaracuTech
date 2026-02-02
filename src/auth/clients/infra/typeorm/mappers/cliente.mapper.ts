import { Cliente } from '../../../domain/entities/cliente.entity';
import { ClienteOrmEntity } from '../entities/cliente.orm-entity';

export class ClienteMapper {
  static toDomain(entity: ClienteOrmEntity): Cliente {
    return Cliente.restore({
      id: entity.id,
      nome: entity.nome,
      email: entity.email,
      telefone: entity.telefone,
      ativo: entity.ativo,
      createdAt: entity.createdAt,
    });
  }

  static toPersistence(cliente: Cliente): ClienteOrmEntity {
    const entity = new ClienteOrmEntity();

    entity.id = cliente.id;
    entity.nome = cliente.nome;
    entity.email = cliente.email;
    entity.telefone = cliente.telefone;
    entity.ativo = cliente.ativo;
    entity.createdAt = cliente.createdAt;

    return entity;
  }
}
