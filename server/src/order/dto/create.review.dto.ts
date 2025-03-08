import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreateReviewDto {
  @IsInt({ message: "ID користувача має бути цілим числом" })
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsInt({ message: "Рейтинг має бути цілим числом" })
  @Min(1, { message: "Рейтинг має бути не менше 1" })
  @Max(5, { message: "Рейтинг має бути не більше 5" })
  @Transform(({ value }) => parseInt(value, 10))
  rating: number;

  @IsOptional()
  @IsString({ message: "Коментар має бути рядком" })
  comment?: string;
}
