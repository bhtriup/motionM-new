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

    const roomName = this.getRoomName(client);
    await client.join(roomName);

    this.logger.debug(`${client.id} is joined ${this.roomName}!`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('req-set-online')
  setOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody('userId') userId: string,
  ) {
    const roomName = this.getRoomName(client);

    if (!this.onlineUserList.includes(userId)) this.onlineUserList.push(userId);

    this.server.to(roomName).emit('set-online', { list: this.onlineUserList });
  }

  @SubscribeMessage('req-set-offline')
  setOffline(
    @ConnectedSocket() client: Socket,
    @MessageBody('userId') userId: string,
  ) {
    const roomName = this.getRoomName(client);

    var index = this.onlineUserList.indexOf(userId);
    if (index !== -1) {
      this.onlineUserList.splice(index, 1);
    }

    this.server.to(roomName).emit('set-offline', { list: this.onlineUserList });
  }

  @SubscribeMessage('req-online-user-list')
  getOnlineUserList(@ConnectedSocket() client: Socket) {
    const roomName = this.getRoomName(client);

    this.server
      .to(roomName)
      .emit('udt-friend-list', { list: this.onlineUserList });
  }

  private getRoomName(client: Socket) {
    const roomName = `room-${client.handshake.auth.ykiho}`;

    return roomName;
  }
}
