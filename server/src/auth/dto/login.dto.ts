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

  @ApiProperty({
    description: "Назва пристрою",
    example: "Samsung Galaxy S23",
  })
  @IsString()
  @IsNotEmpty()
  deviceName: string;

  @ApiProperty({
    description: "Операційна система пристрою",
    example: "Android 14",
  })
  @IsString()
  @IsNotEmpty()
  os: string;

  @ApiProperty({
    description: "Версія додатку",
    example: "2.1.0",
  })
  @IsString()
  @IsNotEmpty()
  appVersion: string;

  @ApiProperty({
    description: "IP-адреса користувача",
    example: "203.0.113.195",
    required: false,
  })
  @IsString()
  ipAddress?: string;
}
