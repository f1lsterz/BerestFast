import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: number, courierId: number, orderItems) {
    return this.prisma.order.create({
      data: {
        user_id: userId,
        courier_id: courierId,
      },
    });
  }

  async getOrderById(orderId: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
    });
  }

  async cancelOrder(orderId: number) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
        completedAt: new Date(),
      },
    });
  }

  async acceptOrder(orderId: number) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: "ACCEPTED",
      },
    });
  }

  async updateOrderStatus() {}

  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { user_id: userId },
    });
  }

  async addOrderReview(
    orderId: number,
    userId: number,
    rating: number,
    comment?: string
  ) {
    return this.prisma.order_Review.create({
      data: {
        order_id: orderId,
        user_id: userId,
        rating,
        comment,
      },
    });
  }

  async getAllOrders() {}

  async forceCancelOrder(orderId: number) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
        completedAt: new Date(),
      },
    });
  }

  async assignCourier() {}

  async addOrderItem(orderId: number, productId: number, quantity) {
    return this.prisma.order_Items.create({
      data: {
        order_id: orderId,
        product_id: productId,
        quantity,
      },
    });
  }

  async updateOrderItem(orderItemId: number, quantity: number) {
    return this.prisma.order_Items.update({
      where: { id: orderItemId },
      data: { quantity },
    });
  }

  async removeOrderItem(orderItemId: number) {
    return this.prisma.order_Items.delete({
      where: {
        id: orderItemId,
      },
    });
  }

  async getOrderReviews(orderId: number) {
    return this.prisma.order_Review.findMany({
      where: { order_id: orderId },
    });
  }
}
