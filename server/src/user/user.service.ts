import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateSessionDto } from "./dto/create.session.dto";
import { UpdateSessionDto } from "./dto/update.session.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Session, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {
    console.log("Cache Manager in UserService:", this.cacheManager);
  }

  async getUserById(id: number) {
    const cachedUser = await this.cacheManager.get(`user:${id}`);
    if (cachedUser) {
      console.log("Returning cached data...");
      return cachedUser;
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    await this.cacheManager.set(`user:${id}`, user, 3600);
    return user;
  }

  async getUserByPhone(phoneNumber: string) {
    const cachedUser = await this.cacheManager.get<User | null>(
      `user:${phoneNumber}`
    );

    if (cachedUser) {
      console.log("Returning cached data...");
      return cachedUser;
    }

    const user = await this.prisma.user.findUnique({ where: { phoneNumber } });
    await this.cacheManager.set(`user:${phoneNumber}`, user, 3600);
    return user;
  }

  async getAllUsers() {
    console.log(await this.cacheManager.get("testKey"));
    console.log(this.cacheManager);
    const cachedUsers = await this.cacheManager.get("users");
    console.log(await this.cacheManager.get("users"));
    console.log(cachedUsers);

    if (cachedUsers) {
      console.log("Returning cached data...");
      return cachedUsers;
    }

    console.log("Returning DEFAULT data...");
    const users = await this.prisma.user.findMany();
    await this.cacheManager.set("users", users, 3600);
    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({ data: createUserDto });

    console.log("Created user");

    await this.cacheManager.del("users");

    return newUser;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });

    //await this.cacheManager.del(`user:${userId}`);
    //await this.cacheManager.del("users");

    return updatedUser;
  }

  async deleteUser(userId: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });

    //await this.cacheManager.del(`user:${userId}`);
    //await this.cacheManager.del("users");

    return deletedUser;
  }

  async createUserSession(userId: number, createSessionDto: CreateSessionDto) {
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

    //await this.cacheManager.del(`user:${userId}:sessions`);

    return newSession;
  }

  async updateUserSession(
    sessionId: number,
    updateSessionDto: UpdateSessionDto
  ) {
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

    //await this.cacheManager.del(`session:${sessionId}`);
    //await this.cacheManager.del(`user:${updatedSession.userId}:sessions`);

    return updatedSession;
  }

  async getUserSession(sessionId: number) {
    const cachedSession = await this.cacheManager.get<Session | null>(
      `session:${sessionId}`
    );

    if (cachedSession) {
      console.log("Returning cached data...");
      return cachedSession;
    }

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    await this.cacheManager.set(`session:${sessionId}`, session, 3600);

    return session;
  }

  async getUserSessions(userId: number) {
    const cachedSessions = await this.cacheManager.get(
      `user:${userId}:sessions`
    );

    if (cachedSessions) {
      console.log("Returning cached data...");
      return cachedSessions;
    }

    const sessions = await this.prisma.session.findMany({ where: { userId } });
    await this.cacheManager.set(`user:${userId}:sessions`, sessions, 0);

    return sessions;
  }

  async deleteUserSessions(userId: number) {
    const deletedSessions = await this.prisma.session.deleteMany({
      where: { userId },
    });

    //await this.cacheManager.del(`user:${userId}:sessions`);

    return deletedSessions;
  }

  async deleteUserSession(sessionId: number) {
    const deletedSession = await this.prisma.session.delete({
      where: { id: sessionId },
    });

    //await this.cacheManager.del(`session:${sessionId}`);

    return deletedSession;
  }
}
