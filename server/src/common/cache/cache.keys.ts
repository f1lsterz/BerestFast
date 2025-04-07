const CACHE_PREFIX = process.env.CACHE_PREFIX || "dely-cache";

export const CACHE_USERS = {
  USER: (id: number) => `${CACHE_PREFIX}:user:${id}`,
  USER_BY_PHONE: (phone: string) => `${CACHE_PREFIX}:user:${phone}`,
  ALL_USERS: `${CACHE_PREFIX}:users`,
  USER_SESSIONS: (userId: number) => `${CACHE_PREFIX}:user:${userId}:sessions`,
  SESSION: (sessionId: number) => `${CACHE_PREFIX}:session:${sessionId}`,
};

export const CACHE_PRODUCTS = {
  PRODUCT: (id: number) => `${CACHE_PREFIX}:product:${id}`,
  PRODUCT_BY_CATEGORY: (categoryId: number) =>
    `${CACHE_PREFIX}:category:${categoryId}:products`,
  ALL_PRODUCTS: `${CACHE_PREFIX}:products`,
  FAVOURITE_PRODUCTS: (userId: number) =>
    `${CACHE_PREFIX}:user:${userId}:favourites`,
};

export const CACHE_PAYMENTS = {};

export const CACHE_ORDERS = {
  ORDER: (id: number) => `${CACHE_PREFIX}:order:${id}`,
  ALL_ORDERS: `${CACHE_PREFIX}:orders`,
  USER_ORDERS: (userId: number) => `${CACHE_PREFIX}:user:${userId}:orders`,
  ORDER_REVIEWS: (id: number) => `${CACHE_PREFIX}:order:${id}:reviews`,
};

export const CACHE_CHATS = {};
