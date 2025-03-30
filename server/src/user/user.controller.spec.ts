import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { PrismaService } from "src/prisma.service";

describe("UserController", () => {
  let controller: UserController;
  let userService: MockProxy<UserService>;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    userService = mockDeep<UserService>();
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
