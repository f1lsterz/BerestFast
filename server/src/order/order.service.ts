import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder() {}
  async getOrderById() {}
  async cancelOrder() {}
  async acceptOrder() {}
  async updateOrderStatus() {}
  async getUserOrders() {}
  async addOrderReview() {}

  async getAllOrders() {}
  async forceCancelOrder() {}
  async assignCourier() {}
}
