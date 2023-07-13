import { TeamEntity } from 'src/team/entities/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mapId: string;

  @OneToMany(() => TeamEntity, (team) => team.room)
  teams: TeamEntity[];
}
