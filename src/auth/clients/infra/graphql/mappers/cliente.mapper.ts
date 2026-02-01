import { Cliente } from '../../../domain/entities/cliente.entity';
import { ClienteModel } from '../models/cliente.model';

export class ClienteMapper {
  static toModel(cliente: Cliente): ClienteModel {
    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo,
      createdAt: cliente.createdAt,
    };
  }

  static toModels(clientes: Cliente[]): ClienteModel[] {
    return clientes.map(ClienteMapper.toModel);
  }
}

