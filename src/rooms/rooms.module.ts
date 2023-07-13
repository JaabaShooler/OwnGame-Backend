import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { RoomsEventsService } from './rooms.event.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';

@Module({
  providers: [RoomsGateway, RoomsService, RoomsEventsService],
  controllers: [RoomsController],
  imports: [TypeOrmModule.forFeature([RoomEntity])],
})
export class RoomsModule {}
