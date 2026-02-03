import { AdvanceFasePlantioUseCase } from './advance-fase-plantio.use-case';
import { Talhao } from '../../../talhao.entity';
import { Area } from '../../../../shared/value-objects/area.vo';
import { Localizacao } from '../../../../shared/value-objects/localizacao.vo';
import { Plantio } from '../../../plantio.entity';
import { FaseCultivo } from '../../../domain/enums/fase-cultivo.enum';
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

describe('AdvanceFasePlantioUseCase', () => {
  it('deve avançar a fase do plantio', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new AdvanceFasePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    const plantio = talhao.addPlantio('Café', new Date());

    await repository.create(talhao);

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      plantioId: plantio.id,
      novaFase: FaseCultivo.DESENVOLVIMENTO,
    });

    expect(plantio.fase).toBe(FaseCultivo.DESENVOLVIMENTO);
  });

  it('não deve permitir retroceder fase', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new AdvanceFasePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    const plantio = talhao.addPlantio('Café', new Date());
    talhao.advanceFasePlantio(plantio.id, FaseCultivo.DESENVOLVIMENTO);

    await repository.create(talhao);

    await expect(
      useCase.execute({
        talhaoId: talhao.id,
        clienteId: 'cliente-1',
        plantioId: plantio.id,
        novaFase: FaseCultivo.PLANTIO,
      }),
    ).rejects.toThrow('Não é permitido retroceder fase do cultivo');
  });

  it('deve lançar erro quando talhão não existe', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new AdvanceFasePlantioUseCase(repository);

    await expect(
      useCase.execute({
        talhaoId: 'nao-existe',
        clienteId: 'cliente-1',
        plantioId: 'plantio-1',
        novaFase: FaseCultivo.DESENVOLVIMENTO,
      }),
    ).rejects.toThrow(TalhaoNaoEncontradoError);
  });

  it('deve lançar erro quando clienteId não corresponde', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new AdvanceFasePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    const plantio = talhao.addPlantio('Café', new Date());

    await repository.create(talhao);

    await expect(
      useCase.execute({
        talhaoId: talhao.id,
        clienteId: 'cliente-diferente',
        plantioId: plantio.id,
        novaFase: FaseCultivo.DESENVOLVIMENTO,
      }),
    ).rejects.toThrow(TalhaoNaoEncontradoError);
  });

  it('deve avançar fase até colheita', async () => {
    const repository = new TalhoesRepositoryFake();
    const useCase = new AdvanceFasePlantioUseCase(repository);

    const talhao = Talhao.create(
      'talhao-1',
      'cliente-1',
      'Talhão A',
      new Area(1000),
      new Localizacao('Zona Norte'),
    );

    const plantio = talhao.addPlantio('Café', new Date());

    await repository.create(talhao);

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      plantioId: plantio.id,
      novaFase: FaseCultivo.DESENVOLVIMENTO,
    });

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      plantioId: plantio.id,
      novaFase: FaseCultivo.FLORACAO,
    });

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      plantioId: plantio.id,
      novaFase: FaseCultivo.FRUTIFICACAO,
    });

    await useCase.execute({
      talhaoId: talhao.id,
      clienteId: 'cliente-1',
      plantioId: plantio.id,
      novaFase: FaseCultivo.COLHEITA,
    });

    expect(plantio.fase).toBe(FaseCultivo.COLHEITA);
  });
});

