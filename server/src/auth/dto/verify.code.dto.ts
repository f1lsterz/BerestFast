import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";

export class VerifyCodeDto {
  @ApiProperty({
    description: "Номер телефону користувача (формат: +380xxxxxxxxx)",
    example: "+380123456789",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("UA")
  @Matches(/^\+380\d{9}$/, { message: "Phone number is not valid" })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
