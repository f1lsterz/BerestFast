import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import {
  Order,
  Order_Status,
  OrderItem,
  OrderReview,
  OrderPart,
  Prisma,
} from "@prisma/client";
import { CACHE_ORDERS } from "../common/cache/cache.keys";
import { UpdateOrderPartDto } from "./dto/update.order.part.dto";
import { UpdateOrderReviewDto } from "./dto/update.order.review.dto";

@Injectable()
export class OrderService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}

  async createOrder(userId: number): Promise<Order> {
    const order = await this.prisma.order.create({
      data: {
        userId,
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

  async getAllOrders(): Promise<Order[]> {
    const cacheKey = CACHE_ORDERS.ALL_ORDERS;
    const cachedOrders = await this.cacheManager.get<Order[]>(cacheKey);

    if (cachedOrders) return cachedOrders;

    const orders = await this.prisma.order.findMany();

    await this.cacheManager.set(cacheKey, orders, 86400);

    return orders;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const cacheKey = CACHE_ORDERS.USER_ORDERS(userId);
    const cachedOrders = await this.cacheManager.get<Order[]>(cacheKey);

    if (cachedOrders) return cachedOrders;

    const orders = await this.prisma.order.findMany({
      where: { userId },
    });

    await this.cacheManager.set(cacheKey, orders, 3600);

    return orders;
  }

  async getCourierOrders(courierId: number): Promise<Order[]> {
    const cacheKey = CACHE_ORDERS.COURIER_ORDERS(courierId);
    const cachedOrders = await this.cacheManager.get<Order[]>(cacheKey);

    if (cachedOrders) return cachedOrders;

    const orders = await this.prisma.order.findMany({
      where: { courierId },
    });

    await this.cacheManager.set(cacheKey, orders, 3600);

    return orders;
  }

  async getOrdersByStatus(status: Order_Status): Promise<Order[]> {
    const cacheKey = `${CACHE_ORDERS.ALL_ORDERS}:status:${status}`;
    const cached = await this.cacheManager.get<Order[]>(cacheKey);
    if (cached) return cached;

    const orders = await this.prisma.order.findMany({ where: { status } });
    await this.cacheManager.set(cacheKey, orders, 3600);
    return orders;
  }

  async updateOrderStatus(
    orderId: number,
    newStatus: Order_Status
  ): Promise<Order> {
    const cacheKey = CACHE_ORDERS.ORDER(orderId);

    const FINAL_STATUSES: Order_Status[] = [
      Order_Status.CANCELLED,
      Order_Status.DELIVERED,
    ];

    const isFinalStatus = FINAL_STATUSES.includes(newStatus);

    console.log(Order_Status);

    const data: Prisma.OrderUpdateInput = {
      status: newStatus,
      ...(isFinalStatus && { completedAt: new Date() }),
    };

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data,
    });

    await this.cacheManager.del(cacheKey);
    await this.cacheManager.del(CACHE_ORDERS.ALL_ORDERS);
    await this.cacheManager.del(CACHE_ORDERS.USER_ORDERS(updatedOrder.userId));

    return updatedOrder;
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

  async deleteOrder(orderId: number): Promise<Order> {
    const order = this.prisma.order.delete({
      where: { id: orderId },
    });

    await this.cacheManager.del(CACHE_ORDERS.ALL_ORDERS);
    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderId));

    return order;
  }

  async calculateOrderTotal(orderId: number): Promise<Number> {
    const parts = await this.prisma.orderPart.findMany({
      where: { orderId },
      select: { amount: true },
    });
    const total = parts.reduce((sum, p) => sum + Number(p.amount), 0);
    await this.prisma.order.update({
      where: { id: orderId },
      data: { totalAmount: total },
    });
    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderId));
    return total;
  }

  async addOrderPart(
    orderId: number,
    storeId: number | null,
    restaurantId: number | null,
    amount: Prisma.Decimal | number
  ): Promise<OrderPart> {
    const part = await this.prisma.orderPart.create({
      data: {
        order: { connect: { id: orderId } },
        store: storeId ? { connect: { id: storeId } } : undefined,
        restaurant: restaurantId
          ? { connect: { id: restaurantId } }
          : undefined,
        amount,
      },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER_PARTS(orderId));
    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderId));

    return part;
  }

  async getOrderPartById(partId: number): Promise<OrderPart | null> {
    const cacheKey = CACHE_ORDERS.ORDER_PART(partId);
    const cached = await this.cacheManager.get<OrderPart | null>(cacheKey);
    if (cached) return cached;

    const part = await this.prisma.orderPart.findUnique({
      where: { id: partId },
      include: { items: true },
    });

    if (part) await this.cacheManager.set(cacheKey, part, 3600);

    return part;
  }

  async calculateOrderPartTotal(): Promise<void> {}

  async getOrderParts(orderId: number): Promise<OrderPart[]> {
    const cacheKey = CACHE_ORDERS.ORDER_PARTS(orderId);
    const cached = await this.cacheManager.get<OrderPart[]>(cacheKey);
    if (cached) return cached;

    const parts = await this.prisma.orderPart.findMany({
      where: { orderId },
      include: { items: true },
    });

    await this.cacheManager.set(cacheKey, parts, 3600);
    return parts;
  }

  async updateOrderPart(
    partId: number,
    updateOrderPartDto: UpdateOrderPartDto
  ) {
    const updated = await this.prisma.orderPart.update({
      where: { id: partId },
      data: updateOrderPartDto,
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER_PART(partId));
    await this.cacheManager.del(CACHE_ORDERS.ORDER_PARTS(updated.orderId));

    return updated;
  }

  async removeOrderPart(partId: number): Promise<OrderPart> {
    const part = await this.prisma.orderPart.findUnique({
      where: { id: partId },
      select: { orderId: true },
    });
    if (!part) throw new Error("OrderPart not found");

    const deleted = await this.prisma.orderPart.delete({
      where: { id: partId },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER_PARTS(part.orderId));
    await this.cacheManager.del(CACHE_ORDERS.ORDER(part.orderId));

    return deleted;
  }

  async addOrderItem(
    orderPartId: number,
    productId: number,
    quantity: number
  ): Promise<OrderItem> {
    const item = await this.prisma.orderItem.create({
      data: { orderPartId, productId, quantity },
    });
    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderPartId));
    return item;
  }

  async getItemsByOrderPart(orderPartId: number): Promise<OrderItem[]> {
    const cacheKey = CACHE_ORDERS.ORDER_ITEMS(orderPartId);
    const cached = await this.cacheManager.get<OrderItem[]>(cacheKey);
    if (cached) return cached;

    const items = await this.prisma.orderItem.findMany({
      where: { orderPartId },
    });

    await this.cacheManager.set(cacheKey, items, 3600);

    return items;
  }

  async getOrderItemById(orderItemId: number): Promise<OrderItem | null> {
    const cacheKey = CACHE_ORDERS.ORDER_ITEM(orderItemId);
    const cached = await this.cacheManager.get<OrderItem>(cacheKey);
    if (cached) return cached;

    const item = await this.prisma.orderItem.findUnique({
      where: { id: orderItemId },
    });

    if (item) await this.cacheManager.set(cacheKey, item, 3600);

    return item;
  }

  async updateOrderItem(
    orderItemId: number,
    quantity: number
  ): Promise<OrderItem> {
    const item = await this.prisma.orderItem.update({
      where: { id: orderItemId },
      data: { quantity },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER(item.orderPartId));

    return item;
  }

  async removeOrderItem(orderItemId: number): Promise<OrderItem> {
    const item = await this.prisma.orderItem.delete({
      where: { id: orderItemId },
    });

    await this.cacheManager.del(CACHE_ORDERS.ORDER_PARTS(item.orderPartId));

    return item;
  }

  async addOrderReview(
    orderId: number,
    userId: number,
    rating: number,
    comment?: string
  ): Promise<OrderReview> {
    const exists = await this.prisma.orderReview.findUnique({
      where: { orderId },
    });
    if (exists) {
      throw new Error("Order already has a review");
    }
    const review = await this.prisma.orderReview.create({
      data: { orderId, userId, rating, comment },
    });
    await this.cacheManager.del(CACHE_ORDERS.ORDER(orderId));
    return review;
  }

  async getOrderReview(orderId: number): Promise<OrderReview | null> {
    const review = await this.prisma.orderReview.findUnique({
      where: { orderId },
    });
    return review;
  }

  async updateOrderReview(
    reviewId: number,
    updateOrderReviewDto: UpdateOrderReviewDto
  ) {
    const review = await this.prisma.orderReview.update({
      where: { id: reviewId },
      data: updateOrderReviewDto,
    });

    return review;
  }

  async deleteOrderReview(orderId: number): Promise<OrderReview> {
    const review = await this.prisma.orderReview.delete({
      where: { orderId },
    });
    return review;
  }
}
