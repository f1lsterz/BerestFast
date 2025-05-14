import { Test, TestingModule } from "@nestjs/testing";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { PrismaService } from "src/prisma.service";

describe("StoreController", () => {
  let controller: StoreController;
  let productService: MockProxy<StoreService>;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    productService = mockDeep<StoreService>();
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        {
          provide: StoreService,
          useValue: productService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
