import { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { TalhaoListItemDTO } from './list-talhoes-by-cliente.dto';

interface ListTalhoesByClienteRequest {
  clienteId: string;
}

export class ListTalhoesByClienteUseCase {
  constructor(
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(
    data: ListTalhoesByClienteRequest,
  ): Promise<TalhaoListItemDTO[]> {
    const talhoes =
      await this.talhoesRepository.findAllByCliente(
        data.clienteId,
      );

    return talhoes.map((talhao) => ({
      id: talhao.id,
      nome: talhao.nome,
      area: talhao.area.getValue(),
      localizacao: talhao.localizacao.getValue(),
    }));
  }
}

