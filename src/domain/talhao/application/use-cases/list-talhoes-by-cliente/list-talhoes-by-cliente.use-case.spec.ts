import { ListTalhoesByClienteUseCase } from './list-talhoes-by-cliente.use-case';
import type { TalhoesReadRepository } from '../../queries/talhoes-read.repository';
import type { TalhaoReadDTO } from '../../dtos/talhao-read.dto';

class TalhoesReadRepositoryFake implements TalhoesReadRepository {
  private talhoes: TalhaoReadDTO[] = [];

  async findByClienteId(clienteId: string): Promise<TalhaoReadDTO[]> {
    return this.talhoes.filter((t) => t.id.startsWith(clienteId));
  }

  addTalhao(talhao: TalhaoReadDTO) {
    this.talhoes.push(talhao);
  }
}

describe('ListTalhoesByClienteUseCase', () => {
  it('deve listar talhões por cliente', async () => {
    const repository = new TalhoesReadRepositoryFake();
    const useCase = new ListTalhoesByClienteUseCase(repository);

    repository.addTalhao({
      id: 'cliente-1-talhao-1',
      nome: 'Talhão A',
      area: 1000,
      localizacao: 'Zona Norte',
      totalPlantios: 2,
    });

    repository.addTalhao({
      id: 'cliente-1-talhao-2',
      nome: 'Talhão B',
      area: 800,
      localizacao: 'Zona Sul',
      totalPlantios: 1,
    });

    repository.addTalhao({
      id: 'cliente-2-talhao-1',
      nome: 'Talhão C',
      area: 500,
      localizacao: 'Zona Leste',
      totalPlantios: 0,
    });

    const result = await useCase.execute('cliente-1');

    expect(result).toHaveLength(2);
    expect(result[0].nome).toBe('Talhão A');
    expect(result[1].nome).toBe('Talhão B');
  });

  it('deve retornar lista vazia quando cliente não tem talhões', async () => {
    const repository = new TalhoesReadRepositoryFake();
    const useCase = new ListTalhoesByClienteUseCase(repository);

    const result = await useCase.execute('cliente-sem-talhoes');

    expect(result).toHaveLength(0);
  });
});
