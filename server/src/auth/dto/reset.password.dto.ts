import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
    description: "Номер телефону користувача (формат: +380xxxxxxxxx)",
    example: "+380123456789",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("UA")
  phoneNumber: string;

  @ApiProperty({
    description: "Новий пароль користувача (від 6 до 20 символів)",
    example: "newsecurepassword123",
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  newPassword: string;

  @ApiProperty({
    description: "Токен для верифікації телефону (отриманий через SMS)",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3cr3tT0k3n",
  })
  @IsString()
  @IsNotEmpty()
  phoneVerificationToken: string;
}
