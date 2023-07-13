import { RoomEntity } from 'src/rooms/entities/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teams')
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => RoomEntity, (room) => room.teams)
  room: RoomEntity;
}
