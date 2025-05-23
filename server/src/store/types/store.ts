import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Store {
  @ApiProperty({ description: "ID магазину" })
  id: number;

  @ApiProperty({ description: "Назва магазину" })
  name: string;

  @ApiProperty({ description: "Адреса магазину" })
  address: string;

  @ApiPropertyOptional({
    description: "URL логотипа магазину",
    example: "https://example.com/logo.png",
  })
  logoUrl?: string | null;

  @ApiProperty({
    description: "Дата створення запису",
    example: "2025-05-19T12:34:56.789Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Дата останнього оновлення запису",
    example: "2025-05-20T08:15:30.123Z",
  })
  updatedAt: Date;
}
