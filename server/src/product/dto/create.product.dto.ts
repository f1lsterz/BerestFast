import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: "Назва продукту", example: "Revo" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Ціна продукту", example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: "Нова ціна продукту (зі знижкою)",
    example: 799.99,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  newPrice?: number;

  @ApiProperty({ description: "Чи має знижку", example: false })
  @IsBoolean()
  hasDiscount: boolean;

  @ApiProperty({
    description: "URL зображення продукту",
    example: "https://example.com/image.jpg",
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: "ID категорії продукту", example: 1 })
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiPropertyOptional({ description: "ID магазину", example: 1 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  storeId?: number;

  @ApiPropertyOptional({ description: "ID ресторану", example: 1 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  restaurantId?: number;
}
