import { ApiError } from "../common/errors/apiError";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PaymentService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async createPayment(userId, orderId, amount, paymentMethod) {
    const payment = await this.prisma.payment.create({
      data: {
        userId,
        orderId,
        amount,
        method: paymentMethod.toUpperCase(),
        status: "PENDING",
      },
    });

    switch (paymentMethod) {
      case "google_pay":
        return 1;
      case "apple_pay":
        return 2;
      case "monobank":
        return 3;
      case "privatbank":
        return 4;
      default:
        throw ApiError.BadRequest("Невідомий спосіб оплати");
    }
  }

  async confirmPayment(paymentId: number) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: "COMPLETED" },
    });
  }

  async cancelPayment(paymentId: number) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: "CANCELLED" },
    });
  }

  async getUserPayments(userId: number) {
    return this.prisma.payment.findMany({ where: { userId } });
  }

  async getPaymentStatus(paymentId: number) {
    return this.prisma.payment.findUnique({ where: { id: paymentId } });
  }

  async getAllPayments() {
    return this.prisma.payment.findMany();
  }

  private async processGooglePay(paymentId: number) {}

  private async processApplePay() {}

  private async processMonobank() {}

  /* private async processPrivatbank() {
    const privatBankApiUrl = this.configService.get("PRIVATBANK_API_URL");
    const response = await fetch(`${privatBankApiUrl}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, amount }),
    });
  } */
}
