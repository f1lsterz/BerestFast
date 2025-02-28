import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: "Назва продукту, яку можна оновити",
    example: "Apple iPhone 13 Pro Max",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: "Опис продукту, який можна оновити",
    example: "Оновлений iPhone 13 Pro Max з покращеними характеристиками",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: "Ціна продукту, яку можна оновити (не може бути менша за 0)",
    example: 1199.99,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(999999)
  price?: number;

  @ApiPropertyOptional({
    description: "URL зображення продукту, яке можна оновити",
    example: "https://example.com/iphone13pro.jpg",
  })
  //@IsUrl()
  @IsOptional()
  image_url?: string;

  @ApiPropertyOptional({
    description: "ID категорії продукту, яке можна оновити",
    example: 2,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  categoryId?: number;
}
