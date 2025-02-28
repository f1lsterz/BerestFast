import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: "Назва продукту",
    example: "Revo",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Опис продукту",
    example: "Імба",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Ціна продукту (не може бути меншою за 0)",
    example: 999.99,
  })
  @IsDecimal()
  @Min(0)
  price: number;

  @ApiProperty({
    description: "URL зображення продукту",
    example: "https://example.com/iphone13.jpg",
  })
  //@IsUrl()
  @IsNotEmpty()
  image_url: string;

  @ApiPropertyOptional({
    description: "ID категорії продукту (необов'язково)",
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  categoryId: number;
}
