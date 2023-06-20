import {
  ConnectedSocket,
  MessageBody,
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
  namespace: 'chat',
  transports: ['websocket'],
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private readonly roomName = 'motion-m-chat-room';

  afterInit() {
    this.logger.debug(`Socket Server Init Complete`);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`${client.id} is connected in dashboard!`);

    const roomName = this.getRoomName(client);
    await client.join(roomName);

    this.logger.debug(`${client.id} is joined ${roomName}!`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('send-msg')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody('userId') userId: string,
    @MessageBody('msg') msg: string,
  ) {
    const roomName = this.getRoomName(client);

    // 나를 제외한 방에 있는 모든 유저에게
    client.broadcast.to(roomName).emit('get-msg', { userId, msg });
  }

  private getRoomName(client: Socket) {
    const roomName = `room-${client.handshake.auth.roomIdx}`;

    return roomName;
  }
}
