import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateSessionDto } from "./dto/create.session.dto";
import { UpdateSessionDto } from "./dto/update.session.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByPhone(phoneNumber: string) {
    return this.prisma.user.findUnique({ where: { phoneNumber } });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({ where: { id: userId } });
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

    return this.prisma.session.create({
      data: {
        refreshToken: createSessionDto.refreshToken,
        deviceName: createSessionDto.deviceName,
        os: createSessionDto.os,
        appVersion: createSessionDto.appVersion,
        ipAddress: createSessionDto.ipAddress,
        userId: userId,
      },
    });
  }

  async updateUserSession(
    sessionId: number,
    updateSessionDto: UpdateSessionDto
  ) {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        refreshToken: updateSessionDto.refreshToken,
        deviceName: updateSessionDto.deviceName,
        os: updateSessionDto.os,
        appVersion: updateSessionDto.appVersion,
        ipAddress: updateSessionDto.ipAddress,
      },
    });
  }

  async getUserSessions(userId: number) {
    return this.prisma.session.findMany({ where: { userId } });
  }

  async deleteUserSessions(userId: number) {
    return this.prisma.session.deleteMany({ where: { userId } });
  }

  async deleteUserSession(userId: number, sessionId: number) {
    return this.prisma.session.delete({
      where: { id: sessionId, userId },
    });
  }
}
