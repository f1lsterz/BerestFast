import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateSessionDto } from "./dto/create.session.dto";
import { UpdateSessionDto } from "./dto/update.session.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Session, User } from "@prisma/client";
import { ApiError } from "../common/errors/apiError";
import { CACHE_USERS } from "../common/cache/cache.keys";

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}

  async getUserById(id: number): Promise<User | null> {
    const cacheKey = CACHE_USERS.USER(id);
    const cachedUser = await this.cacheManager.get<User | null>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    await this.cacheManager.set(cacheKey, user, 0);
    return user;
  }

  async getUserByPhone(phoneNumber: string): Promise<User> {
    const cacheKey = CACHE_USERS.USER_BY_PHONE(phoneNumber);
    const cachedUser = await this.cacheManager.get<User | null>(
      `user:${phoneNumber}`
    );

    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.prisma.user.findUnique({ where: { phoneNumber } });

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    await this.cacheManager.set(cacheKey, user, 3600);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const cacheKey = CACHE_USERS.ALL_USERS;
    const cachedUsers = await this.cacheManager.get<User[]>(cacheKey);

    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.prisma.user.findMany();
    await this.cacheManager.set(cacheKey, users, 0);
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({ data: createUserDto });

    await this.cacheManager.del(CACHE_USERS.ALL_USERS);

    return newUser;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });

    await this.cacheManager.del(CACHE_USERS.USER(userId));
    await this.cacheManager.del(CACHE_USERS.ALL_USERS);

    return updatedUser;
  }

  async updateUserPhone(userId: number, userPhone: string): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { phoneNumber: userPhone },
    });

    await this.cacheManager.del(CACHE_USERS.USER(userId));
    await this.cacheManager.del(CACHE_USERS.ALL_USERS);

    return updatedUser;
  }

  async deleteUser(userId: number): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });

    await this.cacheManager.del(CACHE_USERS.USER(userId));
    await this.cacheManager.del(CACHE_USERS.ALL_USERS);

    return deletedUser;
  }

  async createUserSession(
    userId: number,
    createSessionDto: CreateSessionDto
  ): Promise<Session> {
    const existingSession = await this.prisma.session.findFirst({
      where: {
        userId,
        refreshToken: createSessionDto.refreshToken,
      },
    });

    if (existingSession) {
      throw new Error("Session already exists");
    }

    const newSession = await this.prisma.session.create({
      data: {
        refreshToken: createSessionDto.refreshToken,
        deviceName: createSessionDto.deviceName,
        os: createSessionDto.os,
        appVersion: createSessionDto.appVersion,
        ipAddress: createSessionDto.ipAddress,
        userId: userId,
      },
    });

    await this.cacheManager.del(CACHE_USERS.USER_SESSIONS(userId));

    return newSession;
  }

  async updateUserSession(
    sessionId: number,
    updateSessionDto: UpdateSessionDto
  ): Promise<Session> {
    const updatedSession = await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        refreshToken: updateSessionDto.refreshToken,
        deviceName: updateSessionDto.deviceName,
        os: updateSessionDto.os,
        appVersion: updateSessionDto.appVersion,
        ipAddress: updateSessionDto.ipAddress,
      },
    });

    await this.cacheManager.del(CACHE_USERS.SESSION(sessionId));
    await this.cacheManager.del(
      CACHE_USERS.USER_SESSIONS(updatedSession.userId)
    );

    return updatedSession;
  }

  async getUserSession(sessionId: number): Promise<Session | null> {
    const cacheKey = CACHE_USERS.SESSION(sessionId);
    const cachedSession = await this.cacheManager.get<Session | null>(cacheKey);

    if (cachedSession) {
      return cachedSession;
    }

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    await this.cacheManager.set(cacheKey, session, 3600);

    return session;
  }

  async getUserSessions(userId: number): Promise<Session[]> {
    const cacheKey = CACHE_USERS.USER_SESSIONS(userId);
    const cachedSessions = await this.cacheManager.get<Session[]>(cacheKey);

    if (cachedSessions) {
      return cachedSessions;
    }

    const sessions = await this.prisma.session.findMany({ where: { userId } });
    await this.cacheManager.set(cacheKey, sessions, 0);

    return sessions;
  }

  async deleteUserSessions(userId: number) {
    const deletedSessions = await this.prisma.session.deleteMany({
      where: { userId },
    });

    await this.cacheManager.del(CACHE_USERS.USER_SESSIONS(userId));

    return deletedSessions;
  }

  async deleteUserSession(sessionId: number): Promise<Session> {
    const deletedSession = await this.prisma.session.delete({
      where: { id: sessionId },
    });

    await this.cacheManager.del(CACHE_USERS.SESSION(sessionId));

    return deletedSession;
  }
}
