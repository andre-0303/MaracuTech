import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { PlantioOrmEntity } from './plantio.orm-entity';

@Index(['clienteId'])
@Entity('talhoes')
export class TalhaoOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  clienteId: string;

  @Column()
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column()
  localizacao: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PlantioOrmEntity, (plantio) => plantio.talhao, {
    cascade: true,
    eager: true,
  })
  plantios: PlantioOrmEntity[];
}
