import { EntityManager } from 'typeorm';

export interface TransactionManager {
  run<T>(fn: (manager: EntityManager) => Promise<T>): Promise<T>;
}

