import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreateReviewDto {
  @IsInt({ message: "User ID should be an integer" })
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsInt({ message: "Rating should be an integer" })
  @Min(1, { message: "Rating must be at least 1" })
  @Max(5, { message: "Rating must be at most 5" })
  @Transform(({ value }) => parseInt(value, 10))
  rating: number;

  @IsOptional()
  @IsString({ message: "Comment must be a string" })
  comment?: string;
}
