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
import { ChatService } from './chat.service';
import { tenancyMiddleware } from '../tenancy/tenancy.middleware';
import { ChatEntity } from './entity/chat.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import DataSourceManager from '../tenancy/database.util';
import { DB_TYPE } from '../common/constant/constant';

@WebSocketGateway(3004, {
  namespace: 'chat',
  transports: ['websocket'],
  middlewares: [tenancyMiddleware],
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  private chatService: ChatService;

  afterInit() {
    this.logger.debug(`Socket Server Init Complete`);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`${client.id} is connected in chatting room !`);

    const dataSource = await DataSourceManager.getInstance().getDBDataSource(
      client.handshake.auth.ykiho,
      DB_TYPE.chat,
    );
    const chatRepository: Repository<ChatEntity> =
      dataSource.getRepository(ChatEntity);

    this.chatService = new ChatService(chatRepository);

    const roomName = this.getRoomName(client);
    await client.join(roomName);

    this.logger.debug(`${client.id} is joined ${roomName}!`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('send-msg')
  async sendMsg(
    @ConnectedSocket() client: Socket,
    @MessageBody('roomIdx') roomIdx: number,
    @MessageBody('userId') userId: string,
    @MessageBody('msg') msg: string,
  ) {
    const roomName = this.getRoomName(client);

    // 메시지 저장
    const chatEntity = new ChatEntity();
    chatEntity.roomIdx = roomIdx;
    chatEntity.userId = userId;
    chatEntity.msg = msg;
    await this.chatService.insertMsg(chatEntity);

    // // 나를 제외한 방에 있는 모든 유저에게
    client.broadcast.to(roomName).emit('get-msg', { userId, msg });
  }

  private getRoomName(client: Socket) {
    const roomName = `motion-m-chat-room-${client.handshake.auth.roomIdx}`;

    return roomName;
  }
}
