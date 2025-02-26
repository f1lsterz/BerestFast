import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import config from "src/config/config";
import { UserService } from "src/user/user.service";
import * as argon2 from "argon2";
import { RegistrationDto } from "./dto/registration.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiError } from "src/common/errors/apiError";

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { phoneNumber, password } = LoginDto;

    const user = await this.userService.getUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    if (!this.validatePassword(password, user.password)) {
      throw ApiError.BadRequest("Invalid password");
    }

    /*  const accessToken = await this.generateAccessToken(user);

    return { user, accessToken }; */
  }
  async registration(registrationDto: RegistrationDto) {
    const { name, password, phoneNumber } = registrationDto;

    const hashedPassword = await argon2.hash(password);

    /* const user = await this.userService.createUser({
        name, password: hashedPassword, phoneNumber
    });

    return user, accessToken, refreshToken; */
  }
  private async validatePassword(password: string, hashedPassword: string) {
    return await argon2.verify(hashedPassword, password);
  }
  async generateTokens() {}
}
