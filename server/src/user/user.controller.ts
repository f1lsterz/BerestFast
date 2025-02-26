import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { UserByIdNotPipe } from "src/common/pipes/NotExistBy/UserByIdNot";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":userId")
  @HttpCode(200)
  async getUserById(@Param("userId", UserByIdNotPipe) userId: number) {
    return this.userService.getUserById(userId);
  }

  @Get("phone/:phoneNumber")
  @HttpCode(200)
  async getUserByPhone(@Param("phoneNumber") phoneNumber: string) {
    return this.userService.getUserByPhone(phoneNumber);
  }

  @Get()
  @HttpCode(200)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(":userId")
  @HttpCode(204)
  async updateUser(
    @Param("userId", UserByIdNotPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(":userId")
  @HttpCode(204)
  async deleteUser(@Param("userId", UserByIdNotPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }

  @Get(":userId/sessions")
  @HttpCode(200)
  async getUserSessions(@Param("userId", UserByIdNotPipe) userId: number) {
    return this.userService.getUserSessions(userId);
  }
}
