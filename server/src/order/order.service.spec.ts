import { Test, TestingModule } from "@nestjs/testing";
import { OrderService } from "./order.service";
import { PrismaService } from "../prisma.service";
import { Cache } from "cache-manager";
import { MockProxy, mockDeep } from "jest-mock-extended";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("OrderService", () => {
  let service: OrderService;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
