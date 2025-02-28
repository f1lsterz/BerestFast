import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { UserByIdNotPipe } from "src/common/pipes/NotExistBy/UserByIdNot";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/types/user.response";
import { Session } from "src/common/types/session.response";
import { UpdateSessionDto } from "./dto/update.session.dto";
import { SessionByIdNotPipe } from "src/common/pipes/NotExistBy/SessionByIdNot";
import { CreateSessionDto } from "./dto/create.session.dto";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":userId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "User found", type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  async getUserById(@Param("userId", UserByIdNotPipe) userId: number) {
    return this.userService.getUserById(userId);
  }

  @Get("phone/:phoneNumber")
  @HttpCode(200)
  @ApiOperation({ summary: "Get user by phone number" })
  @ApiParam({
    name: "phoneNumber",
    required: true,
    description: "Phone number of the user",
  })
  @ApiResponse({ status: HttpStatus.OK, description: "User found", type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  async getUserByPhone(@Param("phoneNumber") phoneNumber: string) {
    return this.userService.getUserByPhone(phoneNumber);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of users",
    type: [User],
  })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User created",
    type: User,
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(":userId")
  @HttpCode(204)
  @ApiOperation({ summary: "Update user information" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "User updated" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  async updateUser(
    @Param("userId", UserByIdNotPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(":userId")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete user" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "User deleted" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  async deleteUser(@Param("userId", UserByIdNotPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }

  @Post(":userId/sessions")
  @HttpCode(200)
  @ApiOperation({ summary: "Create a new user session" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Session created",
    type: Session,
  })
  async createUserSession(
    @Param("userId", UserByIdNotPipe) userId: number,
    createSessionDto: CreateSessionDto
  ) {
    return this.userService.createUserSession(userId, createSessionDto);
  }

  @Patch(":sessionId/sessions")
  @HttpCode(200)
  @ApiOperation({ summary: "Create a new user session" })
  @ApiParam({ name: "sessionId", required: true, description: "Session ID" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Session created",
    type: Session,
  })
  async updateUserSession(
    @Param("sessionId", SessionByIdNotPipe) sessionId: number,
    updateSessionDto: UpdateSessionDto
  ) {
    return this.userService.updateUserSession(sessionId, updateSessionDto);
  }

  @Get(":userId/sessions")
  @HttpCode(200)
  @ApiOperation({ summary: "Get all sessions of a user" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of sessions",
    type: [Session],
  })
  async getUserSessions(@Param("userId", UserByIdNotPipe) userId: number) {
    return this.userService.getUserSessions(userId);
  }

  @Delete(":userId/sessions")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete all sessions of a user" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Sessions deleted",
  })
  async deleteUserSessions(@Param("userId", UserByIdNotPipe) userId: number) {
    return this.userService.deleteUserSessions(userId);
  }

  @Delete(":userId/sessions/:sessionId")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete session by Id of a user" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiParam({ name: "sessionId", required: true, description: "Session ID" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Session deleted",
  })
  async deleteUserSession(
    @Param("sessionId", SessionByIdNotPipe) sessionId: number,
    @Param("userId", UserByIdNotPipe) userId: number
  ) {
    return this.userService.deleteUserSession(userId, sessionId);
  }
}
