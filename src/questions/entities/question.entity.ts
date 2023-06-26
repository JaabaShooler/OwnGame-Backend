import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from '../../files/entities/file.entity';
import { MapEntity } from '../../map/entities/map.entity';

export enum MODE {
  DEFAULT = 'DEFAULT',
  CAT = 'CAT',
}

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryName: string;

  @Column({ type: 'enum', enum: MODE, default: MODE.DEFAULT })
  mode: MODE;

  @Column('int')
  orderX: number;

  @Column('int')
  orderY: number;

  @Column('int')
  cost: number;

  @Column('int')
  round: number;

  @Column()
  text: string;

  @ManyToOne(() => MapEntity, (map) => map.questions)
  map: MapEntity;

  @OneToMany(() => FileEntity, (file) => file.question)
  files?: FileEntity[];
}
