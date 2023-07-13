import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
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

  @WebSocketServer() server: Namespace;

  getServer() {
    return this.server;
  }

  afterInit() {
    this.logger.log('|--RoomsGateway is initialized!');
  }

  handleConnection(client: Socket): void {
    const sockets = this.server.sockets;
    const { token } = client.handshake.query;
    if (!token) {
      client.disconnect(true);
    }
    client.join(token);
    this.server
      .to(token)
      .emit('connected', `Client with id: ${client.id} - connected.`);
    this.logger.log(`Client with id: ${client.id} - connected.`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}.`);
  }

  handleDisconnect(client: Socket): void {
    const sockets = this.server.sockets;
    this.logger.log(`Client with id: ${client.id} - disconnected.`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}.`);
  }

  emit(message: string, data: any, room: string) {
    this.server.to(room).emit(message, data);
  }
}
