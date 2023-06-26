import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { QuestionEntity } from '../../questions/entities/question.entity';

export enum STATUS {
  DRAFT = 'DRAFT',
  FINISHED = 'FINISHED',
}

export enum VISIBILITY {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
@Entity('maps')
export class MapEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: VISIBILITY, default: VISIBILITY.PUBLIC })
  visibility: VISIBILITY;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.DRAFT })
  status: STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.maps)
  user: UserEntity;

  @Column()
  createdBy: string;

  @OneToMany(() => QuestionEntity, (question) => question.map)
  questions: QuestionEntity[];
}
