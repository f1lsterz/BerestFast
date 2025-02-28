import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty({ description: "ID продукту" })
  id: number;

  @ApiProperty({ description: "Назва продукту" })
  name: string;

  @ApiProperty({ description: "Опис продукту" })
  description: string;

  @ApiProperty({ description: "Ціна продукту" })
  price: number;

  @ApiProperty({ description: "URL зображення продукту" })
  image_url: string;

  @ApiProperty({ description: "Дата створення продукту" })
  createdAt: Date;

  @ApiProperty({ description: "Дата оновлення продукту" })
  updatedAt: Date;

  @ApiProperty({ description: "ID категорії продукту" })
  categoryId: number;
}
