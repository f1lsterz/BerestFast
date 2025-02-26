import { Controller, Delete, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getAllUsers() {
    return {
      message: "All users",
    };
  }

  @Patch(":userId")
  @HttpCode(204)
  async updateUser() {
    return this.userService.updateUser();
  }

  @Get(":userId")
  @HttpCode(200)
  async getUser() {
    return this.userService.getUser();
  }

  @Post()
  @HttpCode(201)
  async createUser() {
    return this.userService.createUser();
  }

  @Delete(":userId")
  @HttpCode(204)
  async deleteUser() {
    return this.userService.deleteUser();
  }
}
