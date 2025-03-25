import CustomFetchServices from "./CustomFetchServices";
import { LoginDto } from "DTOs/loginDTOs/loginDto";
import { LogoutDto } from "DTOs/loginDTOs/logoutDto";
import { RegistrationDto } from "DTOs/loginDTOs/registrationDto";
import { RefreshTokenDto } from "DTOs/loginDTOs/refreshTokenDto";
import { BASE_URL } from "./CustomFetchServices";

class AuthService {
  private readonly basePath = "/auth";

  async register(data: RegistrationDto) {
    return CustomFetchServices.post(
      `${BASE_URL}${this.basePath}/registration`,
      data
    );
  }

  // Логін користувача
  async login(data: LoginDto) {
    return CustomFetchServices.post(`${BASE_URL}${this.basePath}/login`, data);
  }

  // Оновлення токену доступу
  async refreshToken(data: RefreshTokenDto) {
    return CustomFetchServices.post(
      `${BASE_URL}${this.basePath}/refresh`,
      data
    );
  }

  // Вихід з системи
  async logout(data: LogoutDto) {
    return CustomFetchServices.post(`${BASE_URL}${this.basePath}/logout`, data);
  }
}

export default new AuthService();
