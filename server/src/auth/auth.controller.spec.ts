import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { JwtService } from "@nestjs/jwt";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: MockProxy<AuthService>;
  let jwtService: MockProxy<JwtService>;

  beforeEach(async () => {
    authService = mockDeep<AuthService>();
    jwtService = mockDeep<JwtService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
