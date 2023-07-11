import { Controller, Post } from '@nestjs/common';
import { RoomsEventsService } from './rooms.event.service';

@Controller()
export class RoomsController {
  constructor(private readonly roomsEventsService: RoomsEventsService) {}

  @Post()
  createRoom() {
    return this.roomsEventsService.updateRoom('asd', {}, 'asd');
  }
}
