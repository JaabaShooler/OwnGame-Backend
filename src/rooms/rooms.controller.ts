import { Controller, Post, UseGuards } from '@nestjs/common';
import { Body, Get, Param } from '@nestjs/common/decorators';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/auth.jwt.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsEventsService } from './rooms.event.service';
import { RoomsService } from './rooms.service';

@ApiTags('rooms')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsEventsService: RoomsEventsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Post()
  createRoom(@Body() dto: CreateRoomDto) {
    return this.roomsService.create(dto);
  }

  @Get(':id')
  getRoom(@Param('id') id: string) {
    return this.roomsService.findRoom(id);
  }
}
