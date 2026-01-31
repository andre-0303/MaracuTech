import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(email: string, password: string) {
    // Simulação (depois vira banco)
    if (email !== 'produtor@maracu.tech' || password !== '123456') {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: 'user-id-1',
      email,
      role: 'PRODUTOR',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
