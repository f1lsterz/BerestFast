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

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { phoneNumber, password } = loginDto;

    const user = await this.userService.getUserByPhone(phoneNumber);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    if (!this.validatePassword(password, user.password)) {
      throw ApiError.BadRequest("Invalid password");
    }

    const tokens = await this.generateTokens(user);

    return { user, ...tokens };
  }
  async registration(registrationDto: RegistrationDto) {
    const { name, password, phoneNumber } = registrationDto;

    const hashedPassword = await argon2.hash(password);

    const user = await this.userService.createUser({
      name,
      password: hashedPassword,
      phoneNumber,
    });

    const tokens = await this.generateTokens(user);

    return { user, ...tokens };
  }
  private async validatePassword(password: string, hashedPassword: string) {
    return await argon2.verify(hashedPassword, password);
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
}
