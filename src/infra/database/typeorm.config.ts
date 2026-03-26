import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  synchronize: false, // NUNCA true em prod
  logging: false,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
});
