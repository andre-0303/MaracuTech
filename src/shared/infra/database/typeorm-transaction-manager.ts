import { DataSource, EntityManager } from 'typeorm';
import { TransactionManager } from '../../application/contracts/transaction-manager';

export class TypeOrmTransactionManager implements TransactionManager {
  constructor(private readonly dataSource: DataSource) {}

  async run<T>(fn: (manager: EntityManager) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await fn(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

