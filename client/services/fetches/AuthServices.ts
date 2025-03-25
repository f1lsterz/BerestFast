import CustomFetchServices from "./CustomFetchServices";
import { CreateSessionDto } from "DTOs/userDTOs/CreateSessionDto";
import { CreateUserDto } from "DTOs/userDTOs/CreateUserDto";
import { UpdateUserDto } from "DTOs/userDTOs/UpdateUserDto";
import { UpdateSessionDto } from "DTOs/userDTOs/UpdateSessionDto";
import { BASE_URL } from "./CustomFetchServices";

class AuthService {
  private readonly basePath = "/users"; 

  async getUserById(userId: number) {
    return CustomFetchServices.get(`${BASE_URL}${this.basePath}/${userId}`);
  }

  async getUserByPhone(phoneNumber: string) {
    return CustomFetchServices.get(`${BASE_URL}${this.basePath}/phone/${phoneNumber}`);
  }

  async getAllUsers() {
    return CustomFetchServices.get(`${BASE_URL}${this.basePath}`);
  }

  async createUser(data: CreateUserDto) {
    return CustomFetchServices.post(`http://192.168.0.107:3000/users`, data);
  }

  async updateUser(userId: number, data: UpdateUserDto) {
    return CustomFetchServices.put(`${BASE_URL}${this.basePath}/${userId}`, data);
  }

  async deleteUser(userId: number) {
    return CustomFetchServices.delete(`${BASE_URL}${this.basePath}/${userId}`);
  }

  async createUserSession(userId: number, data: CreateSessionDto) {
    return CustomFetchServices.post(`${BASE_URL}${this.basePath}/${userId}/sessions`, data);
  }

  async updateUserSession(sessionId: number, data: UpdateSessionDto) {
    return CustomFetchServices.patch(`${BASE_URL}${this.basePath}/sessions/${sessionId}`, data);
  }

  async getUserSessions(userId: number) {
    return CustomFetchServices.get(`${BASE_URL}${this.basePath}/${userId}/sessions`);
  }

  async deleteUserSessions(userId: number) {
    return CustomFetchServices.delete(`${BASE_URL}${this.basePath}/${userId}/sessions`);
  }

  async deleteUserSession(sessionId: number) {
    return CustomFetchServices.delete(`${BASE_URL}${this.basePath}/sessions/${sessionId}`);
  }
}

export default new AuthService();
