import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { TalhaoOrmEntity } from './talhao.orm-entity';
import { ColheitaOrmEntity } from './colheita.orm-entity';
import { FaseCultivo } from 'src/domain/talhao/fase-cultivo.enum';

@Entity('plantios')
export class PlantioOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  variedade: string;

  @Column({ type: 'date' })
  dataPlantio: Date;

  @Column('int')
  quantidadeMudas: number;

  @Column({
    type: 'enum',
    enum: FaseCultivo,
    default: FaseCultivo.PLANTADO,
  })
  faseAtual: FaseCultivo;

  @ManyToOne(() => TalhaoOrmEntity, (talhao) => talhao.plantios, {
    onDelete: 'CASCADE',
  })
  talhao: TalhaoOrmEntity;

  @OneToMany(() => ColheitaOrmEntity, (colheita) => colheita.plantio, {
    cascade: true,
    eager: true,
  })
  colheitas: ColheitaOrmEntity[];
}
