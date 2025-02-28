import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Створити нове замовлення' })
  @ApiBody({ type: CreateOrderDto }) /
  @ApiResponse({ status: 201, description: 'Замовлення створено.' })
  @ApiResponse({ status: 400, description: 'Помилка валидації' })
  @Post()
  async createOrder(
    @Param('userId') userId: number,
    @Param('courierId') courierId: number,
    @Body() orderItems: any
  ) {
    return this.orderService.createOrder(userId, courierId, orderItems);
  }

  @ApiOperation({ summary: 'Отримати замовлення за ID' })
  @ApiParam({ name: 'orderId', description: 'ID замовлення' })
  @ApiResponse({ status: 200, description: 'Замовлення знайдено.' })
  @ApiResponse({ status: 404, description: 'Замовлення не знайдено.' })
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @ApiOperation({ summary: 'Скасувати замовлення' })
  @ApiParam({ name: 'orderId', description: 'ID замовлення' })
  @ApiResponse({ status: 200, description: 'Замовлення скасовано.' })
  @ApiResponse({ status: 404, description: 'Замовлення не знайдено.' })
  @Put(':orderId/cancel')
  async cancelOrder(@Param('orderId') orderId: number) {
    return this.orderService.cancelOrder(orderId);
  }

  @ApiOperation({ summary: 'Прийняти замовлення' })
  @ApiParam({ name: 'orderId', description: 'ID замовлення' })
  @ApiResponse({ status: 200, description: 'Замовлення прийнято.' })
  @ApiResponse({ status: 404, description: 'Замовлення не знайдено.' })
  @Put(':orderId/accept')
  async acceptOrder(@Param('orderId') orderId: number) {
    return this.orderService.acceptOrder(orderId);
  }

  @ApiOperation({ summary: 'Отримати всі замовлення користувача' })
  @ApiParam({ name: 'userId', description: 'ID користувача' })
  @ApiResponse({ status: 200, description: 'Список замовлень користувача.' })
  @ApiResponse({ status: 404, description: 'Замовлення не знайдено.' })
  @Get('user/:userId')
  async getUserOrders(@Param('userId') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @ApiOperation({ summary: 'Додати відгук про замовлення' })
  @ApiParam({ name: 'orderId', description: 'ID замовлення' })
  @ApiBody({ type: CreateProductDto }) 
  @ApiResponse({ status: 201, description: 'Відгук додано.' })
  @ApiResponse({ status: 400, description: 'Некоректний відгук.' })
  @Post(':orderId/review')
  async addOrderReview(
    @Param('orderId') orderId: number,
    @Body() reviewData: any
  ) {
    return this.orderService.addOrderReview(orderId, reviewData.userId, reviewData.rating, reviewData.comment);
  }
  
}