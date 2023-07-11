import { Injectable } from '@nestjs/common';
import { RoomsGateway } from './rooms.gateway';

@Injectable()
export class RoomsEventsService {
  constructor(private readonly roomsGateway: RoomsGateway) {}

  updateRoom(message: string, data: any, room: string) {
    return this.roomsGateway.emit(message, data, room);
  }
}
