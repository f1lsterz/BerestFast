import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma.service";
import { Cache } from "cache-manager";
import { MockProxy, mockDeep } from "jest-mock-extended";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateSessionDto } from "./dto/create.session.dto";
import { UpdateSessionDto } from "./dto/update.session.dto";

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
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
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
      const mockUser = {
        id: 1,
        name: "Test User",
        phoneNumber: "+380345678021",
      };
      cacheManager.get.mockResolvedValue(null);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cacheManager.set).toHaveBeenCalledWith(`user:1`, mockUser, 0);
    });
  });

  describe("getUserByPhone", () => {
    it("returns user from cache if available", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        phoneNumber: "+380509848621",
      };
      cacheManager.get.mockResolvedValue(mockUser);

      const result = await service.getUserByPhone("+380509848621");
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it("fetches user from database and caches it if not in cache", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        phoneNumber: "+380345678021",
      };
      cacheManager.get.mockResolvedValue(null);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUserByPhone("+380345678021");
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { phoneNumber: "+380345678021" },
      });
      expect(cacheManager.set).toHaveBeenCalledWith(
        `user:+380345678021`,
        mockUser,
        3600
      );
    });
  });

  describe("getAllUsers", () => {
    it("returns users from cache if available", async () => {
      const mockUsers = [
        { id: 1, name: "Test User 1", phoneNumber: "+380123456789" },
        { id: 2, name: "Test User 2", phoneNumber: "+380987654321" },
      ];
      cacheManager.get.mockResolvedValue(mockUsers);

      const result = await service.getAllUsers();
      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).not.toHaveBeenCalled();
    });

    it("fetches users from database and caches them if not in cache", async () => {
      const mockUsers = [
        { id: 1, name: "Test User 1", phoneNumber: "+380123456789" },
        { id: 2, name: "Test User 2", phoneNumber: "+380987654321" },
      ];
      cacheManager.get.mockResolvedValue(null);
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await service.getAllUsers();
      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(cacheManager.set).toHaveBeenCalledWith("users", mockUsers, 0);
    });
  });

  describe("createUser", () => {
    it("creates a new user and clears the cache", async () => {
      const createUserDto: CreateUserDto = {
        name: "New User",
        phoneNumber: "+380123456789",
        password: "securePass123",
        role: "USER",
      };
      const mockUser = { id: 1, ...createUserDto };
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.createUser(createUserDto);
      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserDto });
      expect(cacheManager.del).toHaveBeenCalledWith("users");
    });
  });

  describe("updateUser", () => {
    it("updates a user and clears the cache", async () => {
      const updateUserDto: UpdateUserDto = { name: "Updated User" };
      const mockUser = { id: 1, ...updateUserDto };
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.updateUser(1, updateUserDto);
      expect(result).toEqual(mockUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
      expect(cacheManager.del).toHaveBeenCalledWith("users");
      expect(cacheManager.del).toHaveBeenCalledWith("user:1");
    });
  });

  describe("deleteUser", () => {
    it("deletes a user and clears the cache", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        phoneNumber: "+380123456789",
      };
      (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.deleteUser(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cacheManager.del).toHaveBeenCalledWith("users");
      expect(cacheManager.del).toHaveBeenCalledWith("user:1");
    });
  });

  describe("createUserSession", () => {
    it("should create a user session", async () => {
      const sessionDto: CreateSessionDto = {
        refreshToken: "token",
        deviceName: "PC",
        os: "Windows",
        appVersion: "1.0",
        ipAddress: "127.0.0.1",
      };
      const mockSession = { id: 1, ...sessionDto, userId: 1 };

      (prisma.session.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.session.create as jest.Mock).mockResolvedValue(mockSession);

      const result = await service.createUserSession(1, sessionDto);

      expect(result).toEqual(mockSession);
      expect(prisma.session.create).toHaveBeenCalledWith({
        data: { ...sessionDto, userId: 1 },
      });
      expect(cacheManager.del).toHaveBeenCalledWith("user:1:sessions");
    });

    it("should throw an error if session already exists", async () => {
      const sessionDto: CreateSessionDto = {
        refreshToken: "token",
        deviceName: "PC",
        os: "Windows",
        appVersion: "1.0",
        ipAddress: "127.0.0.1",
      };
      const existingSession = { id: 1, ...sessionDto, userId: 1 };

      (prisma.session.findFirst as jest.Mock).mockResolvedValue(
        existingSession
      );

      await expect(service.createUserSession(1, sessionDto)).rejects.toThrow(
        "Session already exists"
      );
    });
  });

  describe("updateUserSession", () => {
    it("should update a user session", async () => {
      const updateSessionDto: UpdateSessionDto = {
        refreshToken: "new_token",
        deviceName: "Laptop",
        os: "MacOS",
        appVersion: "2.0",
        ipAddress: "192.168.1.1",
      };
      const mockSession = { id: 1, ...updateSessionDto, userId: 1 };

      (prisma.session.update as jest.Mock).mockResolvedValue(mockSession);

      const result = await service.updateUserSession(1, updateSessionDto);

      expect(result).toEqual(mockSession);
      expect(prisma.session.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateSessionDto,
      });
      expect(cacheManager.del).toHaveBeenCalledWith("session:1");
      expect(cacheManager.del).toHaveBeenCalledWith("user:1:sessions");
    });
  });

  describe("getUserSession", () => {
    it("should return a session from cache if available", async () => {
      const mockSession = { id: 1, userId: 1, refreshToken: "token" };
      cacheManager.get.mockResolvedValue(mockSession);

      const result = await service.getUserSession(1);

      expect(result).toEqual(mockSession);
      expect(prisma.session.findUnique).not.toHaveBeenCalled();
    });

    it("should fetch a session from database if not in cache", async () => {
      const mockSession = { id: 1, userId: 1, refreshToken: "token" };
      cacheManager.get.mockResolvedValue(null);
      (prisma.session.findUnique as jest.Mock).mockResolvedValue(mockSession);

      const result = await service.getUserSession(1);

      expect(result).toEqual(mockSession);
      expect(prisma.session.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(cacheManager.set).toHaveBeenCalledWith(
        "session:1",
        mockSession,
        3600
      );
    });
  });

  describe("deleteUserSession", () => {
    it("should delete a user session and clear cache", async () => {
      const mockSession = { id: 1, userId: 1, refreshToken: "token" };

      (prisma.session.delete as jest.Mock).mockResolvedValue(mockSession);

      const result = await service.deleteUserSession(1);

      expect(result).toEqual(mockSession);
      expect(prisma.session.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cacheManager.del).toHaveBeenCalledWith("session:1");
    });
  });

  describe("deleteUserSessions", () => {
    it("should delete all user sessions and clear cache", async () => {
      (prisma.session.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });

      const result = await service.deleteUserSessions(1);

      expect(result).toEqual({ count: 2 });
      expect(prisma.session.deleteMany).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
      expect(cacheManager.del).toHaveBeenCalledWith("user:1:sessions");
    });
  });
});
