import CustomFetchService from "./CustomFetchServices";
import { LoginDto } from "DTOs/authDTOs/loginDto";
import { LogoutDto } from "DTOs/authDTOs/logoutDto";
import { RegistrationDto } from "DTOs/authDTOs/registrationDto";
import { RefreshTokenDto } from "DTOs/authDTOs/refreshTokenDto";
import { ResetPasswordFormValues } from "DTOs/authDTOs/resetPasswordFormValues";
import { VerifyCodeFormValues } from "DTOs/authDTOs/verifyCodeFormValues";
import { SendCodeFormValues } from "DTOs/authDTOs/sendCodeFormValues";

class AuthService {
  private readonly basePath = "/auth";
  private readonly api: CustomFetchService;

  constructor() {
    this.api = new CustomFetchService();
  }

  async register(data: RegistrationDto) {
    return this.api.post(`${this.basePath}/registration`, data);
  }

  async login(data: LoginDto) {
    return this.api.post(`${this.basePath}/login`, data);
  }

  async refreshToken(data: RefreshTokenDto) {
    return this.api.post(`${this.basePath}/refresh`, data);
  }

  async logout(data: LogoutDto) {
    return this.api.post(`${this.basePath}/logout`, data);
  }

  async resetPassword(data: ResetPasswordFormValues) {
    return this.api.post(`${this.basePath}/reset-password`, data);
  }

  async sendCode(data: SendCodeFormValues) {
    return this.api.post(`${this.basePath}/send-code`, data);
  }

  async verifyCode(data: VerifyCodeFormValues): Promise<boolean> {
    return this.api.post(`${this.basePath}/verify-code`, data);
  }
}

const authService = new AuthService();
export default authService;
