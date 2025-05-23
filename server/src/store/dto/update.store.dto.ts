import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsUrl } from "class-validator";

export class UpdateStoreDto {
  @ApiPropertyOptional({
    example: "Sova Lounge",
    description: "New shop name",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: "вул. Хрещатик, 1, Київ",
    description: "New address of the shop",
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: "https://example.com/new-logo.png",
    description: "New URL shop logo",
  })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;
}
