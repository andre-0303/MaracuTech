import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../../**/*.orm-entity.{ts,js}'],
  migrations: [__dirname + '/../../migrations/*.ts'],
  migrationsTableName: 'migrations',
});
