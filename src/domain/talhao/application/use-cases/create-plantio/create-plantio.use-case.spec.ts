import { CreatePlantioUseCase } from './create-plantio.use-case';
import { Talhao } from '../../../talhao.entity';
import { Area } from '../../../../shared/value-objects/area.vo';
import { Localizacao } from '../../../../shared/value-objects/localizacao.vo';
import { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { TalhaoNaoEncontradoError } from '../../../domain/errors/talhao-nao-encontrado.error';

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

  async existsByNomeAndClienteId(
    nome: string,
    clienteId: string,
  ): Promise<boolean> {
    return Array.from(this.talhoes.values()).some(
      (t) => t.nome === nome && t.clienteId === clienteId,
    );
  }

  async findAllByCliente(
    clienteId: string,
    ativo?: boolean,
  ): Promise<Talhao[]> {
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

describe('CreatePlantioUseCase', () => {
  it('deve criar um plantio dentro do talhão', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new CreatePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    await repository.create(talhao);

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      cultura: 'Café',
      dataPlantio: new Date('2024-01-15'),
    });

    expect(talhao.plantios).toHaveLength(1);
    expect(talhao.plantios[0].cultura).toBe('Café');
    expect(talhao.plantios[0].fase).toBe('PLANTIO');
  });

  it('deve lançar erro quando talhão não existe', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new CreatePlantioUseCase(repository);

    await expect(
      useCase.execute({
        talhaoId: 'nao-existe',
        clienteId: 'cliente-1',
        cultura: 'Café',
        dataPlantio: new Date(),
      }),
    ).rejects.toThrow(TalhaoNaoEncontradoError);
  });

  it('deve lançar erro quando clienteId não corresponde', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new CreatePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    await repository.create(talhao);

    await expect(
      useCase.execute({
        talhaoId: talhao.id,
        clienteId: 'cliente-diferente',
        cultura: 'Café',
        dataPlantio: new Date(),
      }),
    ).rejects.toThrow(TalhaoNaoEncontradoError);
  });

  it('não deve permitir dois plantios ativos da mesma cultura', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new CreatePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    await repository.create(talhao);

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      cultura: 'Café',
      dataPlantio: new Date(),
    });

    await expect(
      useCase.execute({
        talhaoId: talhao.id,
        clienteId: 'cliente-1',
        cultura: 'Café',
        dataPlantio: new Date(),
      }),
    ).rejects.toThrow(
      'Já existe um plantio ativo dessa cultura neste talhão',
    );
  });

  it('deve permitir plantio de cultura diferente mesmo com outra ativa', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new CreatePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    await repository.create(talhao);

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      cultura: 'Café',
      dataPlantio: new Date(),
    });

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      cultura: 'Milho',
      dataPlantio: new Date(),
    });

    expect(talhao.plantios).toHaveLength(2);
  });
});

