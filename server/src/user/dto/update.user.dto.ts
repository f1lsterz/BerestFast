import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: "John Doe",
    description: "Ім'я користувача (необов'язково для оновлення)",
  })
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: "newPassword123",
    description:
      "Пароль користувача (необов'язково для оновлення, має бути від 6 до 20 символів)",
  })
  @IsString()
  @Length(6, 20)
  password?: string;

  @ApiPropertyOptional({
    example: "+380123456789",
    description:
      "Номер телефону користувача (необов'язково для оновлення, має бути у форматі +380XXXXXXXXX)",
  })
  @IsString()
  @IsPhoneNumber()
  @Matches(/^\+380\d{9}$/, { message: "Phone number is not valid" })
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: "https://example.com/photo.jpg",
    description: "URL фотографії користувача (необов'язково для оновлення)",
  })
  @IsString()
  photoUrl?: string;
}
