import { ListTalhoesByClienteUseCase } from './list-talhoes-by-cliente.use-case';
import { Talhao } from '../../../talhao.entity';
import { Area } from '../../../../shared/value-objects/area.vo';
import { Localizacao } from '../../../../shared/value-objects/localizacao.vo';
import { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';

class TalhoesRepositoryFake implements TalhoesRepository {
  private talhoes: Map<string, Talhao> = new Map();

  async create(talhao: Talhao): Promise<void> {
    this.talhoes.set(talhao.id, talhao);
  }

  async save(talhao: Talhao): Promise<void> {
    this.talhoes.set(talhao.id, talhao);
  }

  async findById(id: string): Promise<Talhao | null> {
    return this.talhoes.get(id) || null;
  }

  async findByClienteId(clienteId: string): Promise<Talhao[]> {
    return Array.from(this.talhoes.values()).filter(
      (t) => t.clienteId === clienteId,
    );
  }

  async existsByNomeAndClienteId(nome: string, clienteId: string): Promise<boolean> {
    return Array.from(this.talhoes.values()).some(
      (t) => t.nome === nome && t.clienteId === clienteId,
    );
  }

  async findAllByCliente(clienteId: string, ativo?: boolean): Promise<Talhao[]> {
    return Array.from(this.talhoes.values()).filter((t) => {
      const matchCliente = t.clienteId === clienteId;
      const matchAtivo = ativo === undefined || t.ativo === ativo;
      return matchCliente && matchAtivo;
    });
  }

  async delete(id: string): Promise<void> {
    this.talhoes.delete(id);
  }
}

describe('ListTalhoesByClienteUseCase', () => {
  it('deve listar todos os talhões de um cliente', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new ListTalhoesByClienteUseCase(
      repository,
    );

    const talhao1 = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    const talhao2 = Talhao.create(
      'talhao-2',
      'cliente-1',
      'Talhão B',
      new Area(800),
      new Localizacao('Zona Sul'),
    );

    await repository.create(talhao1);
    await repository.create(talhao2);

    const result = await useCase.execute({
      clienteId: 'cliente-1',
    });

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(
      expect.objectContaining({
        nome: 'Talhão A',
        area: 1000,
      }),
    );
  });

  it('não deve retornar talhões de outro cliente', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new ListTalhoesByClienteUseCase(
      repository,
    );

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-2',
      'Talhão X',
      new Area(500),
      new Localizacao('Zona Oeste'),
    );

    await repository.create(talhao);

    const result = await useCase.execute({
      clienteId: 'cliente-1',
    });

    expect(result).toHaveLength(0);
  });

  it('deve retornar array vazio quando cliente não tem talhões', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new ListTalhoesByClienteUseCase(
      repository,
    );

    const result = await useCase.execute({
      clienteId: 'cliente-sem-talhoes',
    });

    expect(result).toHaveLength(0);
  });
});

