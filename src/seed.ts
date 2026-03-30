import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ClienteOrmEntity } from './auth/clients/infra/typeorm/entities/cliente.orm-entity';
import { v4 as uuidv4 } from 'uuid';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  synchronize: false,
  logging: true,
  entities: [ClienteOrmEntity],
});

async function seed() {
  await AppDataSource.initialize();

  const existingCliente = await AppDataSource.getRepository(
    ClienteOrmEntity,
  ).findOne({
    where: { email: 'produtor@maracu.tech' },
  });

  if (existingCliente) {
    console.log('Produtor já existe:', existingCliente.id);
    await AppDataSource.destroy();
    return;
  }

  const cliente = await AppDataSource.getRepository(ClienteOrmEntity).save({
    id: uuidv4(),
    nome: 'Produtor Teste',
    email: 'produtor@maracu.tech',
    telefone: '11999999999',
    ativo: true,
  });

  console.log('Produtor criado com ID:', cliente.id);
  await AppDataSource.destroy();
}

seed();
