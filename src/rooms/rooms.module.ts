import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { RoomsEventsService } from './rooms.event.service';
import { RoomsController } from './rooms.controller';

@Module({
  providers: [RoomsGateway, RoomsService, RoomsEventsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
