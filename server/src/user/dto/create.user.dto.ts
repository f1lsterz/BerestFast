import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "John Doe", description: "Ім'я користувача" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "securePass123",
    description: "Пароль (від 6 до 20 символів)",
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    example: "+380123456789",
    description: "Номер телефону у форматі +380XXXXXXXXX",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("UA")
  @Matches(/^\+380\d{9}$/, { message: "Phone number is not valid" })
  phoneNumber: string;
}
