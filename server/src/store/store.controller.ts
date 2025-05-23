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
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { StoreService } from "./store.service";
import { CreateStoreDto } from "./dto/create.store.dto";
import { UpdateStoreDto } from "./dto/update.store.dto";
import { Access } from "../common/decorators/access.decorator";
import { Role } from "@prisma/client";
import { Store } from "./types/store";

@ApiTags("Stores")
@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get a store by its ID" })
  @ApiParam({ name: "id", description: "Store ID", type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Store found",
    type: Store,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Store not found" })
  @Access()
  async getStoreById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Store | null> {
    return await this.storeService.getStoreById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all stores" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of stores",
    type: [Store],
  })
  @Access()
  async getAllStores(): Promise<Store[]> {
    return await this.storeService.getAllStores();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new store" })
  @ApiBody({ type: CreateStoreDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Store created",
    type: Store,
  })
  @Access(Role.ADMIN, Role.PARTNER)
  async createStore(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return await this.storeService.createStore(createStoreDto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Update an existing store" })
  @ApiParam({ name: "id", description: "Store ID", type: Number })
  @ApiBody({ type: UpdateStoreDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Store updated" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Store not found" })
  @Access(Role.ADMIN, Role.PARTNER)
  async updateStore(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto
  ): Promise<void> {
    await this.storeService.updateStore(id, updateStoreDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a store by its ID" })
  @ApiParam({ name: "id", description: "Store ID", type: Number })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Store deleted" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Store not found" })
  @Access(Role.ADMIN, Role.PARTNER)
  async deleteStore(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.storeService.deleteStore(id);
  }
}
