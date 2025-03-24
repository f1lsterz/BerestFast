import { Module } from "@nestjs/common";
import { ChatService } from "@chat/chat.service";
import { ChatGateway } from "@chat/chat.gateway";
import { ChatController } from "@chat/chat.controller";
import { AWSModule } from "src/aws/aws.module";

@Module({
  imports: [AWSModule],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
