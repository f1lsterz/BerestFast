import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class RefreshTokenDto {
  @ApiProperty({ description: "Refresh токен", example: "eyJhbGciOiJIUz..." })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({ description: "ID користувача", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
