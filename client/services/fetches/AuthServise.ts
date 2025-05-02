import CustomFetchService from "./CustomFetchServices";
import { LoginDto } from "DTOs/authDTOs/loginDto";
import { LogoutDto } from "DTOs/authDTOs/logoutDto";
import { RegistrationDto } from "DTOs/authDTOs/registrationDto";
import { RefreshTokenDto } from "DTOs/authDTOs/refreshTokenDto";
import { ResetPasswordFormValues } from "DTOs/authDTOs/resetPasswordFormValues";
import { VerifyCodeFormValues } from "DTOs/authDTOs/verifyCodeFormValues";
import { SendCodeFormValues } from "DTOs/authDTOs/sendCodeFormValues";
import { useUserStore } from "services/storage/user-storage";

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

  async refreshTokenMeth(data: RefreshTokenDto) {
    const { accessToken } = useUserStore.getState();
    const accessTokenForFetch = accessToken;

    return this.api.post(`${this.basePath}/refresh`, data, {
      Authorization: `Bearer ${accessTokenForFetch}`,
    });
  }

  async logout(data: LogoutDto) {
    const { accessToken } = useUserStore.getState();
    const accessTokenForFetch = accessToken;
    return this.api.post(`${this.basePath}/logout`, data, {
      Authorization: `Bearer ${accessTokenForFetch}`,
    });
  }

  async resetPassword(data: ResetPasswordFormValues) {
    return this.api.post(`${this.basePath}/reset-password`, data);
  }

  async sendCode(data: SendCodeFormValues) {
    return this.api.post(`${this.basePath}/send-code`, data);
  }

  async verifyCode(data: VerifyCodeFormValues): Promise<boolean> {
    const response = await this.api.post(`${this.basePath}/verify-code`, data);

    if (response.status === 200 && response.data) {
      return response.data as boolean;
    } else {
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
