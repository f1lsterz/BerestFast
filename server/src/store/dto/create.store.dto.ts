import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsUrl } from "class-validator";

export class CreateStoreDto {
  @ApiProperty({
    example: "Sova Lounge",
    description: "Shop name",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "вул. Хрещатик, 1, Київ",
    description: "Address of the shop",
  })
  @IsString()
  address: string;

  @ApiPropertyOptional({
    example: "https://example.com/logo.png",
    description: "URL shop logo",
  })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;
}
