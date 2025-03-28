import { Test, TestingModule } from "@nestjs/testing";
import { PaymentService } from "./payment.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Cache } from "cache-manager";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";

describe("PaymentService", () => {
  let service: PaymentService;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;
  const configServiceMock = { get: jest.fn() };

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
