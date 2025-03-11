import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class LogoutDto {
  @ApiProperty({ description: "Refresh токен", example: "eyJhbGciOiJIUz..." })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({
    description: "Чи виходити з усіх пристроїв?",
    example: false,
    default: false,
  })
  @IsBoolean()
  allDevices: boolean;
}
