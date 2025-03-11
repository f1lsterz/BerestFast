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
import { UserService } from "@user/user.service";
import { CreateUserDto } from "@user/dto/create.user.dto";
import { UpdateUserDto } from "@user/dto/update.user.dto";
import { UserByIdNotPipe } from "@pipes/NotExistBy/UserByIdNot";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@resTypes/user.response";
import { Session } from "@resTypes/session.response";
import { UpdateSessionDto } from "@user/dto/update.session.dto";
import { SessionByIdNotPipe } from "@pipes/NotExistBy/SessionByIdNot";
import { CreateSessionDto } from "@user/dto/create.session.dto";
import { UniquePhoneNumberPipe } from "@pipes/ExistBy/UserByPhone";
import { Access } from "@decorators/access.decorator";

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
  async getUserById(@Param("userId", UserByIdNotPipe) userId: number) {
    return await this.userService.getUserById(userId);
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
  @Access()
  async getUserByPhone(@Param("phoneNumber") phoneNumber: string) {
    return await this.userService.getUserByPhone(phoneNumber);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of users",
    type: [User],
  })
  @Access("ADMIN")
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
  async createUser(@Body(UniquePhoneNumberPipe) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(":userId")
  @HttpCode(204)
  @ApiOperation({ summary: "Update user information" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "User updated" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Access()
  async updateUser(
    @Param("userId", UserByIdNotPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(":userId")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete user" })
  @ApiParam({ name: "userId", required: true, description: "User ID" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "User deleted" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Access("Admin")
  async deleteUser(@Param("userId", UserByIdNotPipe) userId: number) {
    return await this.userService.deleteUser(userId);
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
  @Access()
  async createUserSession(
    @Param("userId", UserByIdNotPipe) userId: number,
    createSessionDto: CreateSessionDto
  ) {
    return await this.userService.createUserSession(userId, createSessionDto);
  }

  @Patch(":sessionId/sessions")
  @HttpCode(200)
  @ApiOperation({ summary: "Update an user session" })
  @ApiParam({ name: "sessionId", required: true, description: "Session ID" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Session updated",
    type: Session,
  })
  @Access("Admin")
  async updateUserSession(
    @Param("sessionId", SessionByIdNotPipe) sessionId: number,
    updateSessionDto: UpdateSessionDto
  ) {
    return await this.userService.updateUserSession(
      sessionId,
      updateSessionDto
    );
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
  async getUserSessions(@Param("userId", UserByIdNotPipe) userId: number) {
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
  async deleteUserSessions(@Param("userId", UserByIdNotPipe) userId: number) {
    return await this.userService.deleteUserSessions(userId);
  }

  @Delete("sessions/:sessionId")
  @HttpCode(204)
  @ApiParam({ name: "sessionId", required: true, description: "Session ID" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Session deleted",
  })
  @Access()
  async deleteUserSession(
    @Param("sessionId", SessionByIdNotPipe) sessionId: number
  ) {
    return await this.userService.deleteUserSession(sessionId);
  }
}
