import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3004, {
  namespace: 'user',
  transports: ['websocket'],
})
export class UserGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(UserGateway.name);
  private readonly roomName = 'motion-m-user';
  private readonly onlineUserList = [];

  afterInit() {
    this.logger.debug(`Socket Server Init Complete`);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`${client.id} is connected in friend-list!`);

    // const roomName = `room-${client.handshake.auth.ykiho}`;
    await client.join(this.roomName);

    this.logger.debug(`${client.id} is joined ${this.roomName}!`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`${client.id} is disconnected...`);
  }

  // @SubscribeMessage('req-udt-friend-list')
  // handleMessage(@ConnectedSocket() client: Socket) {
  //   this.server.to(this.roomName).emit('udt-friend-list');
  // }

  @SubscribeMessage('req-online-user-list')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody('') patno: string,
  ) {
    this.server.to(this.roomName).emit('udt-friend-list');

    this.onlineUserList.push();
  }

  private getRoomName(client: Socket) {
    const roomName = `room-${client.handshake.auth.ykiho}`;

    return roomName;
  }
}
