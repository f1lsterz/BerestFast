import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class ProductService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.prisma.product.create({
      data: createProductDto,
    });

    await this.cacheManager.del("products");

    return newProduct;
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto,
    });

    await this.cacheManager.del(`product:${productId}`);
    await this.cacheManager.del("products");

    return updatedProduct;
  }

  async getAllProducts() {
    const cashedProducts = await this.cacheManager.get("products");

    if (cashedProducts) {
      return cashedProducts;
    }

    const products = await this.prisma.product.findMany();
    await this.cacheManager.set("products", products, 0);
    return products;
  }

  async getRandomProducts(limit?: number) {
    const query = `SELECT * FROM Product ORDER BY RAND()`;
    return limit
      ? this.prisma.$queryRaw`${query} LIMIT ${limit}`
      : this.prisma.$queryRaw`${query}`;
  }

  async getProductById(productId: number) {
    const cashedProduct = await this.cacheManager.get(`product:${productId}`);

    if (cashedProduct) {
      return cashedProduct;
    }

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    await this.cacheManager.set(`product:${productId}`, product, 3600);
    return product;
  }

  async deleteProduct(productId: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: productId },
    });

    await this.cacheManager.del(`product:${productId}`);
    await this.cacheManager.del("products");

    return deletedProduct;
  }

  async getProductsByCategoryWithSort(
    categoryId: number,
    sortBy: "price" | "name",
    sortOrder: "asc" | "desc"
  ) {
    return this.prisma.product.findMany({
      where: { categoryId },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number) {
    return this.prisma.product.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });
  }

  async searchProducts(searchTerm: string) {
    return this.prisma.$queryRaw`
      SELECT * FROM Product WHERE LOWER(name) LIKE LOWER('%${searchTerm}%')
    `;
  }

  async addToFavourites(userId: number, productId: number) {
    return this.prisma.favourite_Product.create({
      data: { userId, productId },
    });
  }

  async removeFromFavourites(userId: number, productId: number) {
    return this.prisma.favourite_Product.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  async isProductInFavourites(userId: number, productId: number) {
    return this.prisma.favourite_Product.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  async getUserFavouriteProducts(userId) {
    const cashedData = await this.cacheManager.get(`user:${userId}:favourites`);

    if (cashedData) {
      return cashedData;
    }

    const favourites = await this.prisma.favourite_Product.findMany({
      where: { userId },
    });
    await this.cacheManager.set(`user:${userId}:favourites`, favourites, 3600);
    return favourites;
  }

  async getCategories() {
    const cashedCategories = await this.cacheManager.get("categories");

    if (cashedCategories) {
      return cashedCategories;
    }

    const categories = await this.prisma.category.findMany();
    await this.cacheManager.set("categories", categories, 3600);
    return categories;
  }
}
