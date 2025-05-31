import { IsInt, IsOptional, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class UpdateOrderPartDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Amount must be a number" })
  @Min(0, { message: "Amount must be at least 0" })
  amount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "storeId must be an integer" })
  storeId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "restaurantId must be an integer" })
  restaurantId?: number | null;
}
