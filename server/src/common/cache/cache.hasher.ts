import * as argon2 from "argon2";

export class CacheHasher {
  private static CACHE_PREFIX = process.env.CACHE_PREFIX;

  static async hashKey(key: string) {
    return await argon2.hash(this.CACHE_PREFIX + key);
  }
}
