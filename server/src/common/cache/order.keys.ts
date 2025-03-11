import { CacheHasher } from "@cache/cache.hasher";

export class OrderCacheKeys {
  static async getOrder(id: number) {
    return await CacheHasher.hashKey(`order:${id}`);
  }

  static async getAllOrders() {
    return await CacheHasher.hashKey("orders");
  }
}
