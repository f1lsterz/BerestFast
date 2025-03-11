import { Controller } from "@nestjs/common";
import { PaymentService } from "@payment/payment.service";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
}
