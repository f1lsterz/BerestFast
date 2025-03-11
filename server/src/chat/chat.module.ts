import { Module } from "@nestjs/common";
import { ChatService } from "@chat/chat.service";
import { ChatGateway } from "@chat/chat.gateway";
import { ChatController } from "@chat/chat.controller";

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
