import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty({ description: "ID користувача" })
  id: number;

  @ApiProperty({ description: "Ім'я користувача" })
  name: string;

  @ApiProperty({ description: "Номер телефону користувача" })
  phoneNumber: string;

  @ApiProperty({
    description: "Роль користувача",
    enum: ["USER", "ADMIN", "COURIER"],
  })
  role: string;

  @ApiProperty({ description: "Дата створення користувача" })
  createdAt: Date;

  @ApiProperty({ description: "Дата оновлення користувача" })
  updatedAt: Date;
}
