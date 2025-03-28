import { Test, TestingModule } from "@nestjs/testing";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { mockDeep, MockProxy } from "jest-mock-extended";

describe("PaymentController", () => {
  let controller: PaymentController;
  let paymentService: MockProxy<PaymentService>;

  beforeEach(async () => {
    paymentService = mockDeep<PaymentService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: paymentService,
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
