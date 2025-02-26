import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment() {}
  async confirmPayment() {}
  async getUserPayments() {}
  async getPaymentStatus() {}
  async cancelPayment() {}
  async getAllPayments() {}
}
