import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { StoreService } from "./store.service";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Access } from "../common/decorators/access.decorator";
import { Role } from "@prisma/client";

@ApiTags("Stores")
@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
}
