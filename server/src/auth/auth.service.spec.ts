import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { PrismaService } from "src/prisma.service";
import { Cache } from "cache-manager";
import { MockProxy, mockDeep } from "jest-mock-extended";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import config from "../config/config";

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: MockProxy<JwtService>;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;
  const configServiceMock = { get: jest.fn() };

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();
    jwtService = mockDeep<JwtService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
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
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: config.KEY,
          useValue: { jwt: { secret: "test-secret", expiresIn: "1h" } }, // Мокані значення
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });
});
