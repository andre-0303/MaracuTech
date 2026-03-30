import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CLIENTES_REPOSITORY } from '../auth/clients/domain/repositories/clientes.repository';
import type { ClientesRepository } from '../auth/clients/domain/repositories/clientes.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(CLIENTES_REPOSITORY)
    private readonly clientesRepository: ClientesRepository,
  ) {}

  async login(email: string, password: string) {
    if (email !== 'produtor@maracu.tech' || password !== '123456') {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const cliente = await this.clientesRepository.findByEmail(email);
    if (!cliente) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: cliente.id,
      email,
      role: 'PRODUTOR',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
