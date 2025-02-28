import { Order_Status } from "@prisma/client";

export class CreateOrderDto {
  status: Order_Status;
}
