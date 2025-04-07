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
}
