import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3004, {
  namespace: 'friend',
  transports: ['websocket'],
})
export class FriendGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(FriendGateway.name);
  private readonly roomName = 'motion-m-room';

  afterInit() {
    this.logger.debug(`Socket Server Init Complete`);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`${client.id} is connected in dashboard!`);

    // const roomName = `room-${client.handshake.auth.ykiho}`;
    await client.join(this.roomName);

    this.logger.debug(`${client.id} is joined ${this.roomName}!`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('req-udt-friend-list')
  handleMessage(@ConnectedSocket() client: Socket) {
    this.server.to(this.roomName).emit('udt-friend-list');
  }
}
