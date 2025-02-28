import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "Пароль користувача (від 6 до 20 символів)",
    example: "securepassword123",
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    description: "Номер телефону користувача (формат: +380xxxxxxxxx)",
    example: "+380123456789",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("UA")
  @Matches(/^\+380\d{9}$/, { message: "Phone number is not valid" })
  phoneNumber: string;
}
