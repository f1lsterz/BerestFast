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
import { AddressService } from "./address.service";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Access } from "../common/decorators/access.decorator";
import { Role } from "@prisma/client";

@ApiTags("Addresses")
@Controller("addresses")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
}
