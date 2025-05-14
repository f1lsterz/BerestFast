import { Test, TestingModule } from "@nestjs/testing";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { PrismaService } from "src/prisma.service";

describe("RestaurantController", () => {
  let controller: RestaurantController;
  let restaurantService: MockProxy<RestaurantService>;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    restaurantService = mockDeep<RestaurantService>();
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        {
          provide: RestaurantService,
          useValue: restaurantService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
