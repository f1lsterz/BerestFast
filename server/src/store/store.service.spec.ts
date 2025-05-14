import { Test, TestingModule } from "@nestjs/testing";
import { StoreService } from "./store.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Cache } from "cache-manager";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("StoreService", () => {
  let service: StoreService;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        { provide: PrismaService, useValue: prisma },
        { provide: CACHE_MANAGER, useValue: cacheManager },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
