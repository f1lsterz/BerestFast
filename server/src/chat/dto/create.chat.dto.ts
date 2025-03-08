import {
  IsInt,
  IsOptional,
  IsEnum,
  IsArray,
  ArrayMinSize,
} from "class-validator";
import { ChatType } from "@prisma/client";

export class CreateChatDto {
  @IsOptional()
  @IsInt()
  orderId?: number;

  @IsArray()
  @ArrayMinSize(2, { message: "Чат повинен мати принаймні двох учасників" })
  @IsInt({ each: true })
  participants: number[];

  @IsEnum(ChatType, { message: "Невірний тип чату" })
  type: ChatType;
}
