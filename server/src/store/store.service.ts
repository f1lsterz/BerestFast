import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ApiError } from "src/common/errors/apiError";
import { CACHE_STORES } from "src/common/cache/cache.keys";
import { Store } from "@prisma/client";
import { UpdateStoreDto } from "./dto/update.store.dto";
import { CreateStoreDto } from "./dto/create.store.dto";

@Injectable()
export class StoreService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}

  async getStoreById(id: number): Promise<Store | null> {
    const cacheKey = CACHE_STORES.STORE(id);
    const cached = await this.cacheManager.get<Store | null>(cacheKey);
    if (cached) {
      return cached;
    }

    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store) throw ApiError.NotFound("Store not found");

    await this.cacheManager.set(cacheKey, store, 0);
    return store;
  }

  async getAllStores(): Promise<Store[]> {
    const cacheKey = CACHE_STORES.ALL_STORES;
    const cached = await this.cacheManager.get<Store[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const stores = await this.prisma.store.findMany();
    await this.cacheManager.set(cacheKey, stores, 0);
    return stores;
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const created = await this.prisma.store.create({ data: createStoreDto });
    await this.cacheManager.del(CACHE_STORES.ALL_STORES);
    return created;
  }

  async updateStore(
    id: number,
    updateStoreDto: UpdateStoreDto
  ): Promise<Store> {
    const existing = await this.prisma.store.findUnique({
      where: { id: id },
    });
    if (!existing) throw ApiError.NotFound("Store not found");

    const updated = await this.prisma.store.update({
      where: { id: id },
      data: updateStoreDto,
    });

    await this.cacheManager.set(CACHE_STORES.STORE(id), updated, 0);
    await this.cacheManager.del(CACHE_STORES.ALL_STORES);

    return updated;
  }

  async deleteStore(storeId: number): Promise<Store> {
    const existing = await this.prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!existing) throw ApiError.NotFound("Store not found");

    const deleted = await this.prisma.store.delete({
      where: { id: storeId },
    });

    await this.cacheManager.del(CACHE_STORES.STORE(storeId));
    await this.cacheManager.del(CACHE_STORES.ALL_STORES);

    return deleted;
  }
}
