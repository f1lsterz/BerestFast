import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SendMessageDto } from "./dto/send.message.dto";
import { CreateChatDto } from "./dto/create.chat.dto";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    return this.prisma.chat.create({
      data: {
        orderId: createChatDto.orderId,
        type: createChatDto.type,
        participants: {
          create: createChatDto.participants.map((userId) => ({ userId })),
        },
      },
    });
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    return this.prisma.message.create({
      data: {
        chatId: sendMessageDto.chatId,
        userId: sendMessageDto.userId,
        content: sendMessageDto.content,
      },
      include: { user: true },
    });
  }

  async getMessages(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatId },
      include: { user: true },
    });
  }

  async getUserChats(userId: number) {
    return this.prisma.chat.findMany({
      where: { participants: { some: { userId } } },
      include: { messages: true, participants: true },
    });
  }
}
