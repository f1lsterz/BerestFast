import CustomFetchService from "./CustomFetchServices";
import { LoginDto } from "DTOs/loginDTOs/loginDto";
import { LogoutDto } from "DTOs/loginDTOs/logoutDto";
import { RegistrationDto } from "DTOs/loginDTOs/registrationDto";
import { RefreshTokenDto } from "DTOs/loginDTOs/refreshTokenDto";

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
}

const authService = new AuthService();
export default authService;
