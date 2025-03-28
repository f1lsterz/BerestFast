import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server, Socket } from "socket.io";
import { SendMessageDto } from "./dto/send.message.dto";
import { UploadedFile } from "@nestjs/common";
import { AWSService } from "../aws/aws.service";

@WebSocketGateway()
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly awsService: AWSService
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() sendMessageDto: SendMessageDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let imageUrl: string | undefined = undefined;

    if (file) {
      imageUrl = await this.awsService.uploadChatImage(file);
    }

    const message = await this.chatService.sendMessage({
      ...sendMessageDto,
      imageUrl,
    });

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
