import { CreateTalhaoUseCase } from './create-talhao.use-case';
import type { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { Talhao } from '../../../talhao.entity';

class TalhoesRepositoryFake implements TalhoesRepository {
  public items: Talhao[] = [];

  async create(talhao: Talhao): Promise<void> {
    this.items.push(talhao);
  }

  async save(talhao: Talhao): Promise<void> {
    const index = this.items.findIndex(t => t.id === talhao.id);
    if (index >= 0) this.items[index] = talhao;
  }

  async findById(): Promise<Talhao | null> {
    return null;
  }

  async findByClienteId(): Promise<Talhao[]> {
    return [];
  }

  async findAllByCliente(): Promise<Talhao[]> {
    return [];
  }

  async delete(): Promise<void> {}

  async existsByNomeAndClienteId(
    nome: string,
    clienteId: string,
  ): Promise<boolean> {
    return this.items.some(
      t => t.nome === nome && t.clienteId === clienteId,
    );
  }
}

describe('CreateTalhaoUseCase', () => {
  it('deve criar um talhão quando o nome for único por cliente', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new CreateTalhaoUseCase(repository as any);

    const talhao = await useCase.execute({
      clienteId: 'cliente-1',
      nome: 'Talhão A',
      area: 1000,
      localizacao: 'Zona Norte',
    });

    expect(repository.items).toHaveLength(1);
    expect(talhao.nome).toBe('Talhão A');
    expect(talhao.clienteId).toBe('cliente-1');
    expect(talhao.area.getValue()).toBe(1000);
  });

  it('não deve permitir criar dois talhões com o mesmo nome para o mesmo cliente', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new CreateTalhaoUseCase(repository as any);

    await useCase.execute({
      clienteId: 'cliente-1',
      nome: 'Talhão A',
      area: 1000,
      localizacao: 'Zona Norte',
    });

    await expect(
      useCase.execute({
        clienteId: 'cliente-1',
        nome: 'Talhão A',
        area: 800,
        localizacao: 'Zona Sul',
      }),
    ).rejects.toThrow(
      'Já existe um talhão com esse nome para este cliente',
    );
  });
});
