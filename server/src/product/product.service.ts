import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct() {}
  async updateProduct() {}
  async getAllProducts() {}
  async getProductsByCategory() {}
  async searchProducts() {}
  async addToFavourites() {}
  async getFavouriteProducts() {}
  async getCategories() {}
}
