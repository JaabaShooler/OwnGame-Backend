import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from '../../questions/entities/question.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  originalName: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @ManyToOne(() => QuestionEntity, (question) => question.files)
  question: QuestionEntity;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
