import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsIP } from "class-validator";

export class UpdateSessionDto {
  @ApiPropertyOptional({
    example: "someNewRefreshToken123",
    description:
      "Токен оновлення для сесії (необов’язково, може бути змінений)",
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiPropertyOptional({
    example: "Samsung Galaxy S21",
    description: "Назва пристрою (необов’язково, може бути змінена)",
  })
  @IsOptional()
  @IsString()
  deviceName?: string;

  @ApiPropertyOptional({
    example: "Android",
    description:
      "Операційна система пристрою (необов’язково, може бути змінена)",
  })
  @IsOptional()
  @IsString()
  os?: string;

  @ApiPropertyOptional({
    example: "2.0.1",
    description: "Версія додатку (необов’язково, може бути змінена)",
  })
  @IsOptional()
  @IsString()
  appVersion?: string;

  @ApiPropertyOptional({
    example: "192.168.0.1",
    description: "IP-адреса пристрою (необов’язково)",
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;
}
