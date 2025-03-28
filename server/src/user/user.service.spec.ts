import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma.service";
import { Cache } from "cache-manager";
import { MockProxy, mockDeep } from "jest-mock-extended";

describe("UserService", () => {
  let service: UserService;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
        { provide: CACHE_MANAGER, useValue: cacheManager },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getUserById", () => {
    it("returns user from cache if available", async () => {
      const mockUser = { id: 1, name: "Test User", phoneNumber: "1234567890" };
      cacheManager.get.mockResolvedValue(mockUser);

      const result = await service.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it("fetches user from database and caches it if not in cache", async () => {
      const mockUser = { id: 1, name: "Test User", phoneNumber: "1234567890" };
      cacheManager.get.mockResolvedValue(null);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cacheManager.set).toHaveBeenCalledWith(`user:1`, mockUser, 0);
    });
  });
});
