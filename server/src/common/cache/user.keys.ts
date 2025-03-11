import { CacheHasher } from "@cache/cache.hasher";

export class UserCacheKeys {
  static async getUser(id: number) {
    return await CacheHasher.hashKey(`user:${id}`);
  }

  static async getUserByPhone(phoneNumber: string) {
    return await CacheHasher.hashKey(`user:${phoneNumber}`);
  }

  static async getAllUsers() {
    return await CacheHasher.hashKey("users");
  }

  static async getUserSession(userId: number) {
    return await CacheHasher.hashKey(`user:${userId}:sessions`);
  }
}
