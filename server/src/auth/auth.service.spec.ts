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
  let userService: MockProxy<UserService>;
  let jwtService: MockProxy<JwtService>;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;
  const configServiceMock = { get: jest.fn() };

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();
    jwtService = mockDeep<JwtService>();
    userService = mockDeep<UserService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userService,
        },
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
          useValue: { jwt: { secret: "test-secret", expiresIn: "1h" } },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });
});
