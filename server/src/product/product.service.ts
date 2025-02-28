import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async updateProduct(productId, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto,
    });
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getRandomProducts(limit?: number) {
    const query = `SELECT * FROM Product ORDER BY RAND()`;
    return limit
      ? this.prisma.$queryRaw`${query} LIMIT ${limit}`
      : this.prisma.$queryRaw`${query}`;
  }

  async getProductById(productId: number) {
    return this.prisma.product.findUnique({
      where: { id: productId },
    });
  }

  async deleteProduct(productId: number) {
    return this.prisma.product.delete({
      where: { id: productId },
    });
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
      data: { user_id: userId, product_id: productId },
    });
  }

  async removeFromFavourites(userId: number, productId: number) {
    return this.prisma.favourite_Product.delete({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });
  }

  async isProductInFavourites(userId: number, productId: number) {
    return this.prisma.favourite_Product.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });
  }

  async getUserFavouriteProducts(userId) {
    return this.prisma.favourite_Product.findMany({
      where: { user_id: userId },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany();
  }
}
