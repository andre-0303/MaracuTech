import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import type { TalhoesRepository } from 'src/domain/talhao/domain/repositories/talhoes.repository';
import { Talhao } from 'src/domain/talhao/talhao.entity';
import { Area } from 'src/domain/shared/value-objects/area.vo';

import { CreateTalhaoInput } from './create-talhao.input';

@Injectable()
export class CreateTalhaoUseCase {
  constructor(private readonly talhoesRepository: TalhoesRepository) {}

  async execute(input: CreateTalhaoInput): Promise<Talhao> {
    // 1️⃣ Regra de negócio: nome único por cliente
    const jaExiste = await this.talhoesRepository.existsByNomeAndClienteId(
      input.nome,
      input.clienteId,
    );

    if (jaExiste) {
      throw new Error('Já existe um talhão com esse nome para este cliente');
    }

    // 2️⃣ Criação do agregado usando factory method
    const talhao = Talhao.create(
      randomUUID(),
      input.clienteId,
      input.nome,
      new Area(input.area),
      input.localizacao,
    );

    // 3️⃣ Persistência
    await this.talhoesRepository.create(talhao);

    return talhao;
  }
}
