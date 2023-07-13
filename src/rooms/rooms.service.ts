import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: Repository<RoomEntity>,
  ) {}

  create(createRoomDto: CreateRoomDto) {
    return this.repository.save(createRoomDto);
  }

  findRoom(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
}
