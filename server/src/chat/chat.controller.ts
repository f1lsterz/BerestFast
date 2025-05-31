import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SendMessageDto } from "./dto/send.message.dto";

@Controller("chats")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":chatId/messages")
  getMessages(
    @Param("chatId") chatId: number,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 20
  ) {
    return this.chatService.getMessages(chatId, page, limit);
  }

  @Get("user/:userId")
  getUserChats(@Param("userId") userId: number) {
    return this.chatService.getUserChats(userId);
  }

  @Post(":chatId/messages")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException("Підтримуються лише JPG, JPEG, PNG"),
            false
          );
        }
        cb(null, true);
      },
    })
  )
  async sendMessage(
    @Param("chatId", ParseIntPipe) chatId: number,
    @Body() sendMessageDto: SendMessageDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = `/uploads/${file.filename}`;
    }
    return this.chatService.sendMessage({
      chatId,
      ...sendMessageDto,
      imageUrl,
    });
  }
}
