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
} from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create.order.dto";
import { CreateReviewDto } from "./dto/create.review.dto";
import { Access } from "../common/decorators/access.decorator";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: "Create a new order" })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: "Order created successfully" })
  @ApiResponse({ status: 400, description: "Invalid order data" })
  @Access()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, courierId, orderItems } = createOrderDto;
    return this.orderService.createOrder(userId, courierId, orderItems);
  }

  @ApiOperation({ summary: "Get order by ID" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiResponse({ status: 200, description: "Order found" })
  @ApiResponse({ status: 404, description: "Order not found" })
  @Get(":orderId")
  @Access()
  async getOrderById(@Param("orderId") orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, description: "All orders retrieved" })
  @Get()
  @Access()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({ summary: "Get all orders of a user" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({ status: 200, description: "User orders retrieved" })
  @ApiResponse({ status: 404, description: "Orders not found" })
  @Get("user/:userId")
  @Access()
  async getUserOrders(@Param("userId") userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @ApiOperation({ summary: "Add a review for an order" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: "Review added successfully" })
  @ApiResponse({ status: 400, description: "Invalid review data" })
  @Post(":orderId/review")
  @Access()
  async addOrderReview(
    @Param("orderId") orderId: number,
    @Body() createReviewDto: CreateReviewDto
  ) {
    const { userId, rating, comment } = createReviewDto;
    return this.orderService.addOrderReview(orderId, userId, rating, comment);
  }

  @ApiOperation({ summary: "Assign a courier to an order" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, description: "Courier assigned successfully" })
  @ApiResponse({ status: 400, description: "Invalid courier ID" })
  @Put(":orderId/courier")
  @Access()
  async assignCourier(
    @Param("orderId") orderId: number,
    @Body() courierId: number
  ) {
    return this.orderService.assignCourier(orderId, courierId);
  }

  @ApiOperation({ summary: "Add an item to an order" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 201, description: "Item added to order" })
  @Post(":orderId/item")
  @Access()
  async addOrderItem(
    @Param("orderId") orderId: number,
    @Body() { productId, quantity }: { productId: number; quantity: number }
  ) {
    return this.orderService.addOrderItem(orderId, productId, quantity);
  }

  @ApiOperation({ summary: "Update an item in an order" })
  @ApiParam({ name: "orderItemId", description: "Order Item ID" })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: "Order item updated" })
  @Put(":orderItemId")
  @Access()
  async updateOrderItem(
    @Param("orderItemId") orderItemId: number,
    @Body() { quantity }: { quantity: number }
  ) {
    return this.orderService.updateOrderItem(orderItemId, quantity);
  }

  @ApiOperation({ summary: "Remove an item from an order" })
  @ApiParam({ name: "orderItemId", description: "Order Item ID" })
  @ApiResponse({ status: 200, description: "Order item removed" })
  @Delete(":orderItemId")
  @Access()
  async removeOrderItem(@Param("orderItemId") orderItemId: number) {
    return this.orderService.removeOrderItem(orderItemId);
  }

  @ApiOperation({ summary: "Get reviews of an order" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiResponse({ status: 200, description: "Reviews of the order" })
  @Get(":orderId/reviews")
  @Access()
  async getOrderReviews(@Param("orderId") orderId: number) {
    return this.orderService.getOrderReviews(orderId);
  }
}
