import { ApiProperty } from "@nestjs/swagger";

export class FavouriteProductDto {
  @ApiProperty({ description: "ID користувача" })
  user_id: number;

  @ApiProperty({ description: "ID продукту" })
  product_id: number;

  @ApiProperty({ description: "Дата створення запису про улюблений продукт" })
  createdAt: Date;
}
