import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty({ description: "ID категорії" })
  id: number;

  @ApiProperty({ description: "Назва категорії" })
  name: string;

  @ApiProperty({ description: "Дата створення категорії" })
  createdAt: Date;

  @ApiProperty({ description: "Дата оновлення категорії" })
  updatedAt: Date;
}
