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
import { AddressService } from "./address.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Access } from "../common/decorators/access.decorator";
import { CurrentUser } from "src/common/decorators/current.user.decorator";
import { CreateAddressDto } from "./dto/create.address.dto";
import { UpdateAddressDto } from "./dto/update.address.dto";
import { Address } from "./types/address";

@ApiBearerAuth("jwt")
@ApiTags("Addresses")
@Controller("addresses")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Add new address for current user" })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({
    status: 201,
    description: "Address created",
    type: Address,
  })
  @Access()
  async addAddress(
    @CurrentUser() user: { id: number },
    @Body() createAddressDto: CreateAddressDto
  ): Promise<Address> {
    return this.addressService.addAddress(user.id, createAddressDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all addresses of current user" })
  @ApiResponse({
    status: 200,
    description: "List of addresses",
    type: [Address],
    isArray: true,
  })
  @Access()
  async getUserAddresses(
    @CurrentUser() user: { id: number }
  ): Promise<Address[]> {
    return this.addressService.getUserAddresses(user.id);
  }

  @Get(":addressId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get specific address by ID" })
  @ApiParam({ name: "addressId", required: true, description: "Address ID" })
  @ApiResponse({
    status: 200,
    description: "Address data",
    type: Address,
  })
  @ApiResponse({
    status: 404,
    description: "Address not found",
  })
  @Access()
  async getAddressById(
    @Param("addressId") addressId: number
  ): Promise<Address> {
    return this.addressService.getAddressById(addressId);
  }

  @Patch(":addressId")
  @HttpCode(200)
  @ApiOperation({ summary: "Update an address of current user" })
  @ApiParam({ name: "addressId", required: true, description: "Address ID" })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({
    status: 201,
    description: "Address updated",
    type: Address,
  })
  @ApiResponse({
    status: 404,
    description: "Address not found for this user",
  })
  @Access()
  async updateAddress(
    @CurrentUser() user: { id: number },
    @Param("addressId") addressId: number,
    @Body() updateAddressDto: UpdateAddressDto
  ): Promise<Address> {
    return this.addressService.updateAddress(
      user.id,
      addressId,
      updateAddressDto
    );
  }

  @Delete(":addressId")
  @HttpCode(200)
  @ApiOperation({ summary: "Delete an address of current user" })
  @ApiParam({ name: "addressId", required: true, description: "Address ID" })
  @ApiResponse({
    status: 204,
    description: "Address deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Address not found for this user",
  })
  @Access()
  async deleteAddress(
    @CurrentUser() user: { id: number },
    @Param("addressId") addressId: number
  ): Promise<void> {
    await this.addressService.deleteAddress(user.id, addressId);
  }
}
