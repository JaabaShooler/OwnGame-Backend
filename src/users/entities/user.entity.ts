import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MapEntity } from '../../map/entities/map.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  userName: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => MapEntity, (maps) => maps.user)
  maps: MapEntity[];
}
