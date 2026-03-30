import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class ClienteOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefone: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'uuid', nullable: true })
  produtorId: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
