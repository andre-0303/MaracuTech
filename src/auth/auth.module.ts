import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { ClientesModule } from './clients/clientes.module';
import { TalhoesModule } from '../domain/talhao/talhoes.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'maracutech-secret',
      signOptions: { expiresIn: '1d' },
    }),
    ClientesModule,
    TalhoesModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
