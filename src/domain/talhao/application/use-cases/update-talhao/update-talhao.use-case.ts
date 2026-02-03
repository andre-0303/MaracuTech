import { TalhoesRepository } from '../../../domain/repositories/talhoes.repository';
import { Area } from '../../../../shared/value-objects/area.vo';
import { Localizacao } from '../../../../shared/value-objects/localizacao.vo';
import { Talhao } from '../../../talhao.entity';
import { TalhaoNaoEncontradoError } from '../../../domain/errors/talhao-nao-encontrado.error';
import { TalhaoNomeDuplicadoError } from '../../../domain/errors/talhao-nome-duplicado.error';

interface UpdateTalhaoRequest {
  talhaoId: string;
  clienteId: string;
  nome?: string;
  area?: number;
  localizacao?: string;
}

export class UpdateTalhaoUseCase {
  constructor(
    private readonly talhoesRepository: TalhoesRepository,
  ) {}

  async execute(data: UpdateTalhaoRequest) {
    const talhao = await this.talhoesRepository.findById(
      data.talhaoId,
    );

    if (!talhao || talhao.clienteId !== data.clienteId) {
      throw new TalhaoNaoEncontradoError();
    }

    if (data.nome && data.nome !== talhao.nome) {
      const exists =
        await this.talhoesRepository.existsByNomeAndClienteId(
          data.nome,
          data.clienteId,
        );

      if (exists) {
        throw new TalhaoNomeDuplicadoError();
      }
    }

    talhao.update({
      nome: data.nome,
      area: data.area ? new Area(data.area) : undefined,
      localizacao: data.localizacao
        ? new Localizacao(data.localizacao)
        : undefined,
    });

    await this.talhoesRepository.save(talhao);

    return talhao;
  }
}

