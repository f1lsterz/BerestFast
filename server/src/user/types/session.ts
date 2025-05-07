import { ApiProperty } from "@nestjs/swagger";

export class Session {
  @ApiProperty({ description: "ID сесії" })
  id: number;

  @ApiProperty({ description: "Refresh токен сесії" })
  refreshToken: string;

  @ApiProperty({ example: "iPhone 13 Pro", description: "Назва пристрою" })
  deviceName: string;

  @ApiProperty({ example: "iOS", description: "Операційна система пристрою" })
  os: string;

  @ApiProperty({ example: "1.0.5", description: "Версія додатку" })
  appVersion: string;

  @ApiProperty({
    description: "IP-адреса, з якої була здійснена авторизація",
    required: false,
  })
  ipAddress?: string | null;

  @ApiProperty({ description: "Дата створення сесії" })
  createdAt: Date;
}
