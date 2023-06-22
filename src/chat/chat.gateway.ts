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
import { ChatReadService } from './chat.read.service';
import { ChatReadEntity } from './entity/chat.read.entity';
import { RoomService } from '../room/room.service';
import { RoomEntity } from '../room/entity/room.entity';

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

  private roomService: RoomService;
  private chatService: ChatService;
  private chatReadService: ChatReadService;

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

    const chatReadService: Repository<ChatReadEntity> =
      dataSource.getRepository(ChatReadEntity);
    this.chatReadService = new ChatReadService(chatReadService);

    const roomService: Repository<RoomEntity> =
      dataSource.getRepository(RoomEntity);
    this.roomService = new RoomService(roomService);

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
    const insertResult = await this.chatService.insertMsg(chatEntity);

    const chatReadEntity = new ChatReadEntity();
    chatReadEntity.roomIdx = roomIdx;
    chatReadEntity.msgIdx = insertResult.raw.insertId;
    await this.chatReadService.insertMsgRead(chatReadEntity);

    // 마지막 채팅내역 업데이트
    await this.roomService.updateLastMsg(roomIdx, msg);

    const newChat = await this.chatService.getChat(insertResult.raw.insertId);

    // 나를 제외한 방에 있는 모든 유저에게
    // client.broadcast.to(roomName).emit('get-msg', { userId, msg });

    // 모든 유저에게
    this.server.to(roomName).emit('get-msg', newChat);
  }

  private getRoomName(client: Socket) {
    const roomName = `motion-m-chat-room-${client.handshake.auth.roomIdx}`;

    return roomName;
  }
}
