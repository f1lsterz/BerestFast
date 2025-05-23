import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CACHE_ADDRESSES } from "src/common/cache/cache.keys";
import { ApiError } from "src/common/errors/apiError";
import { Address } from "./types/address";

@Injectable()
export class AddressService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}

  async addAddress(
    userId: number,
    data: { street?: string; house: string; flat?: number }
  ) {
    const address = await this.prisma.address.create({
      data: {
        ...data,
        usersAddresses: {
          create: { userId },
        },
      },
    });

    await this.cacheManager.del(CACHE_ADDRESSES.USER_ADDRESSES(userId));

    return address;
  }

  async getUserAddresses(userId: number) {
    const cacheKey = CACHE_ADDRESSES.USER_ADDRESSES(userId);
    const cached = await this.cacheManager.get<Address[]>(cacheKey);
    if (cached) return cached;

    const addresses = await this.prisma.address.findMany({
      where: {
        usersAddresses: {
          some: {
            userId,
          },
        },
      },
    });

    await this.cacheManager.set(cacheKey, addresses, 3600);
    return addresses;
  }

  async getAddressById(addressId: number) {
    const cacheKey = CACHE_ADDRESSES.ADDRESS(addressId);
    const cached = await this.cacheManager.get<Address>(cacheKey);
    if (cached) return cached;

    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw ApiError.NotFound("Address not found.");
    }

    await this.cacheManager.set(cacheKey, address, 3600);
    return address;
  }

  async updateAddress(
    userId: number,
    addressId: number,
    data: { street?: string; house?: string; flat?: number }
  ) {
    const exists = await this.prisma.users_Addresses.findUnique({
      where: {
        userId_addressId: {
          userId,
          addressId,
        },
      },
    });

    if (!exists) {
      throw ApiError.NotFound("Address not found for this user.");
    }

    const updated = await this.prisma.address.update({
      where: { id: addressId },
      data,
    });

    await this.cacheManager.del(CACHE_ADDRESSES.USER_ADDRESSES(userId));
    await this.cacheManager.del(CACHE_ADDRESSES.ADDRESS(addressId));

    return updated;
  }

  async deleteAddress(userId: number, addressId: number) {
    const exists = await this.prisma.users_Addresses.findUnique({
      where: {
        userId_addressId: {
          userId,
          addressId,
        },
      },
    });

    if (!exists) {
      throw ApiError.NotFound("Address not found for this user.");
    }

    await this.prisma.users_Addresses.delete({
      where: {
        userId_addressId: {
          userId,
          addressId,
        },
      },
    });

    const stillUsed = await this.prisma.users_Addresses.findFirst({
      where: {
        addressId,
      },
    });

    if (!stillUsed) {
      await this.prisma.address.delete({ where: { id: addressId } });
    }

    await this.cacheManager.del(CACHE_ADDRESSES.USER_ADDRESSES(userId));
    await this.cacheManager.del(CACHE_ADDRESSES.ADDRESS(addressId));

    return { success: true };
  }
}
