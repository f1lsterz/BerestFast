import { ApiProperty } from "@nestjs/swagger";

export class Session {
  @ApiProperty({ description: "ID сесії" })
  id: number;

  @ApiProperty({ description: "Refresh токен сесії" })
  refreshToken: string;

  @ApiProperty({
    description: "Інформація про пристрій, з якого була здійснена авторизація",
  })
  deviceInfo: any;

  @ApiProperty({
    description: "IP-адреса, з якої була здійснена авторизація",
    required: false,
  })
  ipAddress?: string;

  @ApiProperty({ description: "Дата створення сесії" })
  createdAt: Date;
}
