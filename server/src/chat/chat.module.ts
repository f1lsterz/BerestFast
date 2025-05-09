import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { ChatController } from "./chat.controller";

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
