import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class AddressService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}
}
