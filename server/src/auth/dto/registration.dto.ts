import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import {
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class RegistrationDto {
  @ApiProperty({
    description: "Ім'я користувача",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

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
    description: "Роль користувача (USER, ADMIN, COURIER)",
    example: "USER",
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: "Назва пристрою",
    example: "iPhone 13 Pro",
  })
  @IsString()
  @IsNotEmpty()
  deviceName: string;

  @ApiProperty({
    description: "Операційна система пристрою",
    example: "iOS 17.3",
  })
  @IsString()
  @IsNotEmpty()
  os: string;

  @ApiProperty({
    description: "Версія додатку",
    example: "1.2.5",
  })
  @IsString()
  @IsNotEmpty()
  appVersion: string;

  @ApiProperty({
    description: "IP-адреса користувача",
    example: "192.168.1.1",
    required: false,
  })
  @IsString()
  ipAddress?: string;

  @ApiProperty({
    description: "Токен для верифікації телефону (отриманий через SMS)",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3cr3tT0k3n",
  })
  @IsString()
  @IsNotEmpty()
  phoneVerificationToken: string;
}
