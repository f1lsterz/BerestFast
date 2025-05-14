import { Test, TestingModule } from "@nestjs/testing";
import { RestaurantService } from "./restaurant.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Cache } from "cache-manager";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("RestaurantService", () => {
  let service: RestaurantService;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        { provide: PrismaService, useValue: prisma },
        { provide: CACHE_MANAGER, useValue: cacheManager },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
