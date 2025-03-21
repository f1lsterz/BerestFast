import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class SendMessageDto {
  @IsInt()
  chatId: number;

  @IsInt()
  userId: number;

  @IsString()
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsUrl({}, { message: "Incorrect URL" })
  imageUrl?: string;
}
