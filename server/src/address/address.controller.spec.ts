import { Test, TestingModule } from "@nestjs/testing";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { PrismaService } from "src/prisma.service";

describe("AddressController", () => {
  let controller: AddressController;
  let addressService: MockProxy<AddressService>;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    addressService = mockDeep<AddressService>();
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: addressService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
