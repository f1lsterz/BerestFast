import { Test, TestingModule } from "@nestjs/testing";
import { AddressService } from "./address.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Cache } from "cache-manager";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("AddressService", () => {
  let service: AddressService;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: PrismaService, useValue: prisma },
        { provide: CACHE_MANAGER, useValue: cacheManager },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
