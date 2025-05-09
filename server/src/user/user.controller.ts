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
import { UserByIdNotPipe } from "../common/pipes/NotExistBy/UserByIdNot";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "./types/user";
import { Session } from "./types/session";
import { UpdateSessionDto } from "./dto/update.session.dto";
import { SessionByIdNotPipe } from "../common/pipes/NotExistBy/SessionByIdNot";
import { CreateSessionDto } from "./dto/create.session.dto";
import { UniquePhoneNumberPipe } from "../common/pipes/ExistBy/UserByPhone";
import { Access } from "../common/decorators/access.decorator";
import { Role } from "@prisma/client";
import { PhoneDto } from "./dto/phone.dto";
import { CurrentUser } from "src/common/decorators/current.user.decorator";

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
  @Access()
  async getUserById(
    @Param("userId", UserByIdNotPipe) userId: number
  ): Promise<User | null> {
    return this.userService.getUserById(userId);
  }

  @Get("by-phone")
  @HttpCode(200)
  @ApiOperation({ summary: "Get user by phone number" })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({ status: HttpStatus.OK, description: "User found", type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Access()
  async getUserByPhone(@Body() phoneDto: PhoneDto): Promise<User> {
    return this.userService.getUserByPhone(phoneDto.phoneNumber);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of users",
    type: [User],
  })
  @Access(Role.ADMIN)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User created",
    type: User,
  })
  async createUser(
    @Body(UniquePhoneNumberPipe) createUserDto: CreateUserDto
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch()
  @HttpCode(204)
  @ApiOperation({ summary: "Update user information" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "User updated" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Access()
  async updateUser(
    @CurrentUser() user: { id: number },
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.userService.updateUser(user.id, updateUserDto);
  }

  @Patch("phoneChange")
  @HttpCode(204)
  @ApiOperation({ summary: "Update user phone" })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Phone number updated",
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Access()
  async updateUserPhone(
    @CurrentUser() user: { id: number },
    @Body() changePhoneDto: PhoneDto
  ): Promise<void> {
    await this.userService.updateUserPhone(user.id, changePhoneDto.phoneNumber);
  }

  @Delete(":userId")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete a user by ID" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "User deleted" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Access(Role.ADMIN)
  async deleteUser(
    @Param("userId", UserByIdNotPipe) userId: number
  ): Promise<User> {
    return await this.userService.deleteUser(userId);
  }

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: "Delete own account" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User`s account deleted",
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Access()
  async deleteAccount(@CurrentUser() user: { id: number }): Promise<User> {
    return await this.userService.deleteUser(user.id);
  }

  @Post("/sessions")
  @HttpCode(200)
  @ApiOperation({ summary: "Create a new session for current user" })
  @ApiBody({ type: CreateSessionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Session created",
    type: Session,
  })
  @Access()
  async createUserSession(
    @CurrentUser() user: { id: number },
    @Body() createSessionDto: CreateSessionDto
  ): Promise<Session> {
    return await this.userService.createUserSession(user.id, createSessionDto);
  }

  @Patch("sessions/:sessionId")
  @HttpCode(200)
  @ApiOperation({ summary: "Update an user session" })
  @ApiParam({ name: "sessionId", required: true, description: "Session ID" })
  @ApiBody({ type: UpdateSessionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Session updated",
    type: Session,
  })
  @Access(Role.ADMIN)
  async updateUserSession(
    @Param("sessionId", SessionByIdNotPipe) sessionId: number,
    @Body() updateSessionDto: UpdateSessionDto
  ): Promise<Session> {
    return await this.userService.updateUserSession(
      sessionId,
      updateSessionDto
    );
  }

  @Get("sessions/:sessionId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get a specific session by ID" })
  @ApiParam({ name: "sessionId", required: true, description: "Session ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Single session data",
    type: Session,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Session not found",
  })
  @Access()
  async getUserSession(
    @Param("sessionId", SessionByIdNotPipe) sessionId: number
  ): Promise<Session | null> {
    return await this.userService.getUserSession(sessionId);
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
  @Access()
  async getUserSessions(
    @Param("userId", UserByIdNotPipe) userId: number
  ): Promise<Session[]> {
    return await this.userService.getUserSessions(userId);
  }

  @Delete(":userId/sessions")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete all sessions of a user" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Sessions deleted",
  })
  @Access()
  async deleteUserSessions(
    @Param("userId", UserByIdNotPipe) userId: number
  ): Promise<{ count: number }> {
    return await this.userService.deleteUserSessions(userId);
  }

  @Delete("sessions/:sessionId")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete a specific session by ID" })
  @ApiParam({ name: "sessionId", required: true, description: "Session ID" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Session deleted",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Session not found",
  })
  @Access()
  async deleteUserSession(
    @Param("sessionId", SessionByIdNotPipe) sessionId: number
  ): Promise<Session> {
    return await this.userService.deleteUserSession(sessionId);
  }
}
