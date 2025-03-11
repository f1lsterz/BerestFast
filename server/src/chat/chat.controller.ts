import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "@chat/chat.service";

@Controller("chats")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":chatId/messages")
  getMessages(@Param("chatId") chatId: number) {
    return this.chatService.getMessages(chatId);
  }

  @Get("user/:userId")
  getUserChats(@Param("userId") userId: number) {
    return this.chatService.getUserChats(userId);
  }
}
