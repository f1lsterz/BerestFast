import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Access } from "../common/decorators/access.decorator";
import { RegistrationDto } from "./dto/registration.dto";
import { ResetPasswordDto } from "./dto/reset.password.dto";
import { LogoutDto } from "./dto/logout.dto";
import { RefreshTokenDto } from "./dto/refresh.token.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SendCodeDto } from "./dto/send.code.dto";
import { TwilioService } from "../twilio/twilio.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twilioService: TwilioService
  ) {}

  @Post("registration")
  @HttpCode(201)
  @ApiOperation({ summary: "User registration" })
  @ApiResponse({ status: 201, description: "User successfully registered" })
  @ApiResponse({ status: 400, description: "Validation error" })
  async register(@Body() registrationDto: RegistrationDto) {
    return await this.authService.registration(registrationDto);
  }

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "User successfully logged in" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post("refresh")
  @HttpCode(200)
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({ status: 200, description: "New access token generated" })
  @ApiResponse({ status: 403, description: "Invalid refresh token" })
  @Access()
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(
      refreshTokenDto.refreshToken,
      refreshTokenDto.userId
    );
  }

  @Post("logout")
  @HttpCode(200)
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({ status: 200, description: "User successfully logged out" })
  @ApiResponse({ status: 400, description: "Invalid request" })
  @Access()
  async logout(@Body() logoutDto: LogoutDto) {
    return await this.authService.logout(
      logoutDto.refreshToken,
      logoutDto.allDevices
    );
  }

  @Post("reset-password")
  @HttpCode(200)
  @ApiOperation({ summary: "Reset user password" })
  @ApiResponse({ status: 200, description: "Password successfully reset" })
  @ApiResponse({ status: 400, description: "Phone number verification failed" })
  @ApiResponse({ status: 404, description: "User not found" })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Post("send-code")
  @HttpCode(200)
  @ApiOperation({ summary: "Send verification code to phone number" })
  @ApiResponse({ status: 200, description: "Verification code sent" })
  @ApiResponse({ status: 400, description: "Invalid phone number" })
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    await this.twilioService.sendVerificationCode(sendCodeDto.phoneNumber);
    return { message: "Verification code sent successfully" };
  }
}
