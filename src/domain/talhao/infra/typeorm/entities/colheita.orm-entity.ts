import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { PlantioOrmEntity } from './plantio.orm-entity';

@Entity('colheitas')
export class ColheitaOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  data: Date;

  @Column('int')
  quantidade: number;

  @ManyToOne(() => PlantioOrmEntity, (plantio) => plantio.colheitas, {
    onDelete: 'CASCADE',
  })
  plantio: PlantioOrmEntity;
}
