import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create.order.dto";
import { CreateReviewDto } from "./dto/create.review.dto";
import { Access } from "../common/decorators/access.decorator";
import { Order, OrderReview, Role } from "@prisma/client";

@ApiBearerAuth("jwt")
@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new order" })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: "Order created successfully" })
  @ApiResponse({ status: 400, description: "Invalid order data" })
  @Access()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, courierId } = createOrderDto;
    return this.orderService.createOrder(userId, courierId);
  }

  @Get(":orderId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get order by ID" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiResponse({ status: 200, description: "Order found" })
  @ApiResponse({ status: 404, description: "Order not found" })
  @Access()
  async getOrderById(@Param("orderId") orderId: number): Promise<Order | null> {
    return this.orderService.getOrderById(orderId);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all orders" })
  @ApiQuery({
    name: "status",
    required: false,
    description: "Filter by order status",
  })
  @ApiResponse({ status: 200, description: "All orders retrieved" })
  @Access(Role.ADMIN, Role.COURIER, Role.PARTNER)
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get("user/:userId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get all orders of a user" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({ status: 200, description: "User orders retrieved" })
  @ApiResponse({ status: 404, description: "Orders not found" })
  @Access()
  async getUserOrders(@Param("userId") userId: number): Promise<Order[]> {
    return this.orderService.getUserOrders(userId);
  }

  @Post(":orderId/review")
  @HttpCode(201)
  @ApiOperation({ summary: "Add a review for an order" })
  @ApiParam({ name: "orderId", required: true, description: "Order ID" })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: "Review added successfully" })
  @ApiResponse({ status: 400, description: "Invalid review data" })
  @Access()
  async addOrderReview(
    @Param("orderId") orderId: number,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.orderService.addOrderReview(
      orderId,
      createReviewDto.userId,
      createReviewDto.rating,
      createReviewDto.comment
    );
  }

  @Put(":orderId/courier")
  @HttpCode(200)
  @ApiOperation({ summary: "Assign a courier to an order" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, description: "Courier assigned successfully" })
  @ApiResponse({ status: 400, description: "Invalid courier ID" })
  @Access()
  async assignCourier(
    @Param("orderId") orderId: number,
    @Body() courierId: number
  ): Promise<Order> {
    return this.orderService.assignCourier(orderId, courierId);
  }

  @Post(":orderId/item")
  @HttpCode(201)
  @ApiOperation({ summary: "Add an item to an order" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 201, description: "Item added to order" })
  @Access()
  async addOrderItem(
    @Param("orderId") orderId: number,
    @Body() { productId, quantity }: { productId: number; quantity: number }
  ) {
    return this.orderService.addOrderItem(orderId, productId, quantity);
  }

  @Put(":orderItemId")
  @HttpCode(200)
  @ApiOperation({ summary: "Update an item in an order" })
  @ApiParam({
    name: "orderItemId",
    required: true,
    description: "Order Item ID",
  })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: "Order item updated" })
  @Access()
  async updateOrderItem(
    @Param("orderItemId") orderItemId: number,
    @Body() { quantity }: { quantity: number }
  ) {
    return this.orderService.updateOrderItem(orderItemId, quantity);
  }

  @Delete(":orderItemId")
  @HttpCode(200)
  @ApiOperation({ summary: "Remove an item from an order" })
  @ApiParam({
    name: "orderItemId",
    required: true,
    description: "Order Item ID",
  })
  @ApiResponse({ status: 200, description: "Order item removed" })
  @Access()
  async removeOrderItem(@Param("orderItemId") orderItemId: number) {
    return this.orderService.removeOrderItem(orderItemId);
  }

  @Get(":orderId/reviews")
  @HttpCode(200)
  @ApiOperation({ summary: "Get reviews of an order" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiResponse({ status: 200, description: "Reviews of the order" })
  @ApiResponse({ status: 404, description: "Order not found" })
  @Access()
  async getOrderReviews(
    @Param("orderId") orderId: number
  ): Promise<OrderReview[]> {
    return this.orderService.getOrderReviews(orderId);
  }
}
