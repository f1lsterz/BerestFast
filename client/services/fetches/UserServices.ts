import CustomFetchService from "./CustomFetchServices";
import { CreateSessionDto } from "DTOs/userDTOs/CreateSessionDto";
import { CreateUserDto } from "DTOs/userDTOs/CreateUserDto";
import { UpdateUserDto } from "DTOs/userDTOs/UpdateUserDto";
import { UpdateSessionDto } from "DTOs/userDTOs/UpdateSessionDto";

class UserService {
  private readonly basePath = "/users";
  private readonly api: CustomFetchService;

  constructor() {
    this.api = new CustomFetchService();
  }

  async getUserById(userId: number) {
    return this.api.get(`${this.basePath}/${userId}`);
  }

  async getUserByPhone(phoneNumber: string) {
    return this.api.get(`${this.basePath}/phone/${phoneNumber}`);
  }

  async getAllUsers() {
    return this.api.get(`${this.basePath}`);
  }

  async createUser(data: CreateUserDto) {
    return this.api.post(`${this.basePath}`, data);
  }

  async updateUser(userId: number, data: UpdateUserDto) {
    return this.api.put(`${this.basePath}/${userId}`, data);
  }

  async deleteUser(userId: number) {
    return this.api.delete(`${this.basePath}/${userId}`);
  }

  async createUserSession(userId: number, data: CreateSessionDto) {
    return this.api.post(`${this.basePath}/${userId}/sessions`, data);
  }

  async updateUserSession(sessionId: number, data: UpdateSessionDto) {
    return this.api.put(`${this.basePath}/sessions/${sessionId}`, data);
  }

  async getUserSessions(userId: number) {
    return this.api.get(`${this.basePath}/${userId}/sessions`);
  }

  async deleteUserSessions(userId: number) {
    return this.api.delete(`${this.basePath}/${userId}/sessions`);
  }

  async deleteUserSession(sessionId: number) {
    return this.api.delete(`${this.basePath}/sessions/${sessionId}`);
  }
}

export default new UserService();
