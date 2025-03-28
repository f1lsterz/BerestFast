import { CacheHasher } from "./cache.hasher";

export class ProductCacheKeys {
  static async getProduct(id: number) {
    return await CacheHasher.hashKey(`product:${id}`);
  }

  static async getAllProducts() {
    return await CacheHasher.hashKey("products");
  }

  static async getProductsByCategory(categoryId: number) {
    return await CacheHasher.hashKey(`category:${categoryId}:products`);
  }

  static async getUserFavourites(userId: number): Promise<string> {
    return await CacheHasher.hashKey(`user:${userId}:favourites`);
  }
}
