import { UpdateTalhaoUseCase } from './update-talhao.use-case';
import { Talhao } from '../../../talhao.entity';
import { Area } from '../../../../shared/value-objects/area.vo';
import { TalhaoNaoEncontradoError } from '../../../domain/errors/talhao-nao-encontrado.error';
import { TalhaoNomeDuplicadoError } from '../../../domain/errors/talhao-nome-duplicado.error';
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

describe('UpdateTalhaoUseCase', () => {
  it('deve atualizar um talhão existente', async () => {
    const repo = new TalhoesRepositoryFake();
    const useCase = new UpdateTalhaoUseCase(repo);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      'Zona Norte',
    );

    await repo.create(talhao);

    const updated = await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      nome: 'Talhão B',
      area: 1200,
    });

    expect(updated.nome).toBe('Talhão B');
    expect(updated.area.getValue()).toBe(1200);
  });

  it('não deve permitir nome duplicado para o mesmo cliente', async () => {
    const repo = new TalhoesRepositoryFake();
    const useCase = new UpdateTalhaoUseCase(repo);

    const t1 = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      'Zona Norte',
    );

    const t2 = Talhao.create(
      'talhao-2',
      'cliente-1',
      'Talhão B',
      new Area(800),
      'Zona Sul',
    );

    await repo.create(t1);
    await repo.create(t2);

    await expect(
      useCase.execute({
        talhaoId: t2.id,
        clienteId: 'cliente-1',
        nome: 'Talhão A',
      }),
    ).rejects.toThrow(TalhaoNomeDuplicadoError);
  });

  it('deve lançar TalhaoNaoEncontradoError quando talhão não existe', async () => {
    const repo = new TalhoesRepositoryFake();
    const useCase = new UpdateTalhaoUseCase(repo);

    await expect(
      useCase.execute({
        talhaoId: 'nao-existe',
        clienteId: 'cliente-1',
        nome: 'Talhão Novo',
      }),
    ).rejects.toThrow(TalhaoNaoEncontradoError);
  });

  it('deve lançar TalhaoNaoEncontradoError quando clienteId não corresponde', async () => {
    const repo = new TalhoesRepositoryFake();
    const useCase = new UpdateTalhaoUseCase(repo);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      'Zona Norte',
    );

    await repo.create(talhao);

    await expect(
      useCase.execute({
        talhaoId: talhao.id,
        clienteId: 'cliente-diferente',
        nome: 'Talhão B',
      }),
    ).rejects.toThrow(TalhaoNaoEncontradoError);
  });
});

