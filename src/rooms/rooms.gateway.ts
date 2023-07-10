import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Socket, Namespace } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'rooms',
  cors: '*',
})
export class RoomsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('RoomsGateway');
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer() io: Namespace;

  afterInit(initServer: any) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any, ...args: any[]): any {
    const sockets = this.io.sockets;
    this.logger.log(`Client with id: ${client.id} - connected.`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}.`);
  }

  handleDisconnect(client: any): any {
    const sockets = this.io.sockets;
    this.logger.log(`Client with id: ${client.id} - disconnected.`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}.`);
  }

  @SubscribeMessage('createRoom')
  create(@MessageBody() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @SubscribeMessage('test')
  test(client: Socket, json: object) {
    this.io.emit('test', json);
  }

  @SubscribeMessage('findAllRooms')
  findAll() {
    return this.roomsService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: number) {
    return this.roomsService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  update(@MessageBody() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(updateRoomDto.id, updateRoomDto);
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: number) {
    return this.roomsService.remove(id);
  }
}
