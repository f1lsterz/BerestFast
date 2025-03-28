import { Test, TestingModule } from "@nestjs/testing";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { mockDeep, MockProxy } from "jest-mock-extended";

describe("OrderController", () => {
  let controller: OrderController;
  let orderService: MockProxy<OrderService>;

  beforeEach(async () => {
    orderService = mockDeep<OrderService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: orderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
