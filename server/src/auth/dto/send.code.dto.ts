import { IsPhoneNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendCodeDto {
  @ApiProperty({
    example: "+380501234567",
    description: "Phone number in E.164 format",
  })
  @IsPhoneNumber()
  phoneNumber: string;
}
