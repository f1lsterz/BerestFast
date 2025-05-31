import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class UpdateOrderReviewDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: "Rating must be at least 1" })
  @Max(5, { message: "Rating must be at most 5" })
  rating: number;

  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: "Comment is too long (max 1000 characters)" })
  comment?: string;
}
