import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";

export class UpdateProductDto {
  @ApiPropertyOptional({ description: "Назва продукту", example: "Revo" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: "Ціна продукту", example: 999.99 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: "Нова ціна продукту", example: 799.99 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  newPrice?: number;

  @ApiPropertyOptional({ description: "Чи має знижку", example: true })
  @IsBoolean()
  @IsOptional()
  hasDiscount?: boolean;

  @ApiPropertyOptional({
    description: "URL зображення продукту",
    example: "https://example.com/image.jpg",
  })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiPropertyOptional({ description: "ID категорії продукту", example: 1 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  categoryId?: number;

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
