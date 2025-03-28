import { OrderCacheKeys } from "../common/cache/order.keys";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class OrderService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}

  async createOrder(userId: number, courierId: number, orderItems) {
    const order = this.prisma.order.create({
      data: {
        userId,
        courierId,
      },
    });

    await this.cacheManager.del(await OrderCacheKeys.getAllOrders());
    return order;
  }

  async getOrderById(orderId: number) {
    const cacheKey = await OrderCacheKeys.getOrder(orderId);
    const cachedOrder = await this.cacheManager.get(cacheKey);

    if (cachedOrder) return cachedOrder;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    await this.cacheManager.set(cacheKey, order, 3600);
  }

  async cancelOrder(orderId: number) {
    const cacheKey = await OrderCacheKeys.getOrder(orderId);
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
        completedAt: new Date(),
      },
    });

    await this.cacheManager.del(cacheKey);
    return updatedOrder;
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
      where: { userId: userId },
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
        orderId,
        userId,
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
        orderId,
        productId,
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
      where: { orderId },
    });
  }
}
