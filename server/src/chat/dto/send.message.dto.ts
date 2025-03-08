import { IsInt, IsString } from "class-validator";

export class SendMessageDto {
  @IsInt()
  chatId: number;

  @IsInt()
  userId: number;

  @IsString()
  content: string;
}
