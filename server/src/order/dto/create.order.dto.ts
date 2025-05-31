import { IsEnum, IsInt } from "class-validator";
import { Order_Status } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreateOrderDto {
  @IsEnum(Order_Status, { message: "Invalid order status" })
  status: Order_Status;

  @IsInt({ message: "User ID should be an integer" })
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;
}
