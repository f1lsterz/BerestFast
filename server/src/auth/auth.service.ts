import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import config from "src/config/config";
import { UserService } from "src/user/user.service";
import * as argon2 from "argon2";
import { RegistrationDto } from "./dto/registration.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiError } from "src/common/errors/apiError";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async login(loginDto: LoginDto) {
    const { phoneNumber, password, deviceName, os, appVersion, ipAddress } =
      loginDto;

    const user = await this.userService.getUserByPhone(phoneNumber);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    if (!(await this.validatePassword(password, user.password))) {
      throw ApiError.BadRequest("Invalid password");
    }

    const tokens = await this.generateTokens(user);

    const existingSession = await this.prisma.session.findFirst({
      where: { userId: user.id, deviceName, os, appVersion },
    });

    if (existingSession) {
      await this.prisma.session.update({
        where: { id: existingSession.id },
        data: { refreshToken: tokens.refreshToken, ipAddress },
      });
    } else {
      await this.prisma.session.create({
        data: {
          userId: user.id,
          refreshToken: tokens.refreshToken,
          deviceName,
          os,
          appVersion,
          ipAddress,
        },
      });
    }

    return { user, ...tokens };
  }

  async registration(registrationDto: RegistrationDto) {
    const {
      name,
      password,
      phoneNumber,
      deviceName,
      os,
      appVersion,
      ipAddress,
    } = registrationDto;

    const hashedPassword = await argon2.hash(password);
    const user = await this.userService.createUser({
      name,
      password: hashedPassword,
      phoneNumber,
    });
    const tokens = await this.generateTokens(user);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
        deviceName,
        os,
        appVersion,
        ipAddress,
      },
    });

    return { user, ...tokens };
  }

  private async validatePassword(password: string, hashedPassword: string) {
    return await argon2.verify(hashedPassword, password);
  }

  async logout(refreshToken: string) {
    await this.prisma.session.deleteMany({ where: { refreshToken } });
  }

  private async generateTokens(user: User) {
    const payload = {
      userId: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.secret,
      expiresIn: this.configService.signOptions.expiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.secret,
      expiresIn: this.configService.signOptions.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string, userId: number) {
    const session = await this.prisma.session.findUnique({
      where: { userId_refreshToken: { userId, refreshToken } },
      include: { user: true },
    });

    if (!session || !session.user) {
      throw new Error("Invalid refresh token");
    }

    const tokens = await this.generateTokens(session.user);

    await this.prisma.session.update({
      where: { id: session.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }
}
