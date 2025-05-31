import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { SendMessageDto } from "./dto/send.message.dto";
import { CreateChatDto } from "./dto/create.chat.dto";
import { ApiError } from "../common/errors/apiError";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    return this.prisma.chat.create({
      data: {
        orderId: createChatDto.orderId,
        type: createChatDto.type,
        participants: {
          create: createChatDto.participants.map((userId) => ({
            userId,
          })),
        },
      },
    });
  }

  async sendMessage(sendMessageDto: SendMessageDto & { chatId: number }) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: sendMessageDto.chatId },
    });
    if (!chat) {
      throw ApiError.NotFound("Chat not found");
    }

    if (!sendMessageDto.content && !sendMessageDto.imageUrl) {
      throw ApiError.BadRequest(
        "Повідомлення має містити текст або зображення"
      );
    }

    return this.prisma.message.create({
      data: {
        chatId: sendMessageDto.chatId,
        userId: sendMessageDto.userId,
        content: sendMessageDto.content,
        imageUrl: sendMessageDto.imageUrl,
      },
      include: { user: true },
    });
  }

  async getMessages(chatId: number, page = 1, limit = 20) {
    const exists = await this.prisma.chat.findUnique({
      where: { id: chatId },
    });
    if (!exists) {
      throw ApiError.NotFound("Chat not found");
    }

    return this.prisma.message.findMany({
      where: { chatId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getUserChats(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    return this.prisma.chat.findMany({
      where: { participants: { some: { userId } } },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
        participants: true,
      },
    });
  }
}
