import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsIP } from "class-validator";

export class CreateSessionDto {
  @ApiProperty({
    example: "someRefreshToken123",
    description: "Токен оновлення для сесії",
  })
  @IsString()
  refreshToken: string;

  @ApiProperty({ example: "iPhone 13 Pro", description: "Назва пристрою" })
  @IsString()
  deviceName: string;

  @ApiProperty({ example: "iOS", description: "Операційна система пристрою" })
  @IsString()
  os: string;

  @ApiProperty({ example: "1.0.5", description: "Версія додатку" })
  @IsString()
  appVersion: string;

  @IsOptional()
  @IsIP()
  @ApiPropertyOptional({
    example: "192.168.1.1",
    description: "IP-адреса пристрою (необов’язково)",
  })
  ipAddress?: string | null;
}
