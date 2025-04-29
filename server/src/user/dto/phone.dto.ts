import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";

export class PhoneDto {
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
