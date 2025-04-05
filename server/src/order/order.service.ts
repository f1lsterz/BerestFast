import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Order, Order_Items, Order_Review } from "@prisma/client";

@Injectable()
export class OrderService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}

  async createOrder(
    userId: number,
    courierId: number,
    orderItems
  ): Promise<Order> {
    const order = this.prisma.order.create({
      data: {
        userId,
        courierId,
      },
    });

    await this.cacheManager.del(CACHE_ORDERS.ALL_ORDERS);
    await this.cacheManager.del(CACHE_ORDERS.USER_ORDERS(userId));

    return order;
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    const cacheKey = CACHE_ORDERS.ORDER(orderId);
    const cachedOrder = await this.cacheManager.get<Order>(cacheKey);

    if (cachedOrder) return cachedOrder;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (order) {
      await this.cacheManager.set(cacheKey, order, 3600);
    }
    return order;
  }

  async updateOrderStatus(orderId: number, newStatus: string): Promise<Order> {
    const cacheKey = CACHE_ORDERS.ORDER(orderId);

    const data: any = { status: newStatus };

    if (newStatus === "CANCELLED") {
      data.completedAt = new Date();
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data,
    });

    await this.cacheManager.del(cacheKey);
    await this.cacheManager.del(CACHE_ORDERS.ALL_ORDERS);
    await this.cacheManager.del(CACHE_ORDERS.USER_ORDERS(updatedOrder.userId));

    return updatedOrder;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const cacheKey = CACHE_ORDERS.USER_ORDERS(userId);
    const cachedOrders = await this.cacheManager.get<Order[]>(cacheKey);

    if (cachedOrders) return cachedOrders;

    const orders = await this.prisma.order.findMany({
      where: { userId: userId },
    });

    await this.cacheManager.set(cacheKey, orders, 3600);

    return orders;
  }

  async addOrderReview(
    orderId: number,
    userId: number,
    rating: number,
    comment?: string
  ): Promise<Order_Review> {
    const review = await this.prisma.order_Review.create({
      data: {
        orderId,
        userId,
        rating,
        comment,
      },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderId));

    return review;
  }

  async getAllOrders(): Promise<Order[]> {
    const cacheKey = CACHE_ORDERS.ALL_ORDERS;
    const cachedOrders = await this.cacheManager.get<Order[]>(cacheKey);

    if (cachedOrders) return cachedOrders;

    const orders = await this.prisma.order.findMany();

    await this.cacheManager.set(cacheKey, orders, 86400);

    return orders;
  }

  async assignCourier(orderId: number, courierId: number): Promise<Order> {
    const cacheKey = CACHE_ORDERS.ORDER(orderId);

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { courierId },
    });

    await this.cacheManager.del(cacheKey);

    return updatedOrder;
  }

  async addOrderItem(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<Order_Items> {
    const orderItem = await this.prisma.order_Items.create({
      data: {
        orderId,
        productId,
        quantity,
      },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderId));

    return orderItem;
  }

  async updateOrderItem(
    orderItemId: number,
    quantity: number
  ): Promise<Order_Items> {
    const orderItem = await this.prisma.order_Items.update({
      where: { id: orderItemId },
      data: { quantity },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderItem.orderId));

    return orderItem;
  }

  async removeOrderItem(orderItemId: number): Promise<Order_Items> {
    const orderItem = await this.prisma.order_Items.delete({
      where: { id: orderItemId },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderItem.orderId));

    return orderItem;
  }

  async getOrderReviews(orderId: number): Promise<Order_Review[]> {
    const cacheKey = CACHE_ORDERS.ORDER_REVIEWS(orderId);
    const cachedReviews = await this.cacheManager.get<Order_Review[]>(cacheKey);

    if (cachedReviews) return cachedReviews;

    const reviews = await this.prisma.order_Review.findMany({
      where: { orderId },
    });

    await this.cacheManager.set(cacheKey, reviews, 600);

    return reviews;
  }
}
