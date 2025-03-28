import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { ProductParserService } from "src/ProductParserService";
import { PrismaService } from "src/prisma.service";

describe("ProductController", () => {
  let controller: ProductController;
  let productService: ProductService;
  let productParserService: ProductParserService;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    productService = mockDeep<ProductService>();
    productParserService = mockDeep<ProductParserService>();
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: productService,
        },
        {
          provide: ProductParserService,
          useValue: productParserService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
