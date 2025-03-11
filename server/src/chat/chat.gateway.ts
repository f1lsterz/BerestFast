import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "@chat/chat.service";
import { Server, Socket } from "socket.io";
import { SendMessageDto } from "@chat/dto/send.message.dto";

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() sendMessageDto: SendMessageDto
    //@ConnectedSocket() client: Socket
  ) {
    const message = await this.chatService.sendMessage(sendMessageDto);
    this.server.to(`chat_${sendMessageDto.chatId}`).emit("newMessage", message);
  }

  @SubscribeMessage("joinChat")
  handleJoinChat(chatId: number, @ConnectedSocket() client: Socket) {
    client.join(`chat_${chatId}`);
  }

  @SubscribeMessage("leaveChat")
  handleLeaveChat(chatId: number, @ConnectedSocket() client: Socket) {
    client.leave(`chat_${chatId}`);
  }
}
