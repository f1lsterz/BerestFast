import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
import { Access } from "../common/decorators/access.decorator";
import { Role } from "@prisma/client";
import { ProductParserService } from "../ProductParserService";

@ApiTags("Products")
@Controller("products")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productParserService: ProductParserService
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all products" })
  @Access()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new product" })
  @ApiBody({ type: CreateProductDto })
  @Access(Role.ADMIN)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get("price-range")
  @HttpCode(200)
  @ApiOperation({ summary: "Get products within a price range" })
  @ApiQuery({ name: "minPrice", type: Number })
  @ApiQuery({ name: "maxPrice", type: Number })
  @Access()
  async getProductsByPriceRange(
    @Query("minPrice") minPrice: number,
    @Query("maxPrice") maxPrice: number
  ) {
    return this.productService.getProductsByPriceRange(minPrice, maxPrice);
  }

  @Get("search")
  @HttpCode(200)
  @ApiOperation({ summary: "Search for products by name" })
  @ApiQuery({ name: "searchTerm", type: String })
  @Access()
  async searchProducts(@Query("searchTerm") searchTerm: string) {
    return this.productService.searchProducts(searchTerm);
  }

  @Get("random")
  @HttpCode(200)
  @ApiOperation({ summary: "Get random products" })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
    description: "Optional limit on the number of random products",
  })
  @Access()
  async getRandomProducts(@Query("limit") limit?: number) {
    return this.productService.getRandomProducts(limit);
  }

  @Post("favourites")
  @HttpCode(201)
  @ApiOperation({ summary: "Add a product to favourites" })
  @ApiBody({
    schema: {
      properties: { userId: { type: "number" }, productId: { type: "number" } },
    },
  })
  @Access()
  async addToFavourites(@Body() body: { userId: number; productId: number }) {
    return this.productService.addToFavourites(body.userId, body.productId);
  }

  @Delete("favourites")
  @HttpCode(204)
  @ApiOperation({ summary: "Remove product from favourites" })
  @ApiQuery({ name: "userId", type: Number })
  @ApiQuery({ name: "productId", type: Number })
  @Access()
  async removeFromFavourites(
    @Query("userId") userId: number,
    @Query("productId") productId: number
  ) {
    return this.productService.removeFromFavourites(userId, productId);
  }

  @Get("parse")
  @HttpCode(200)
  @ApiOperation({ summary: "Parse products from external source" })
  async parseProducts() {
    return this.productParserService.parseAllProducts();
  }

  @Get("categories")
  @HttpCode(200)
  @ApiOperation({ summary: "Get all product categories" })
  @Access()
  async getCategories() {
    return await this.productService.getCategories();
  }

  @Put(":productId")
  @HttpCode(200)
  @ApiOperation({ summary: "Update a product by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateProductDto })
  @Access(Role.ADMIN)
  async updateProduct(
    @Param("id") productId: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Get(":productId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get a product by ID" })
  @ApiParam({ name: "id", type: Number })
  //@Access()
  async getProductById(@Param("id") productId: number) {
    return this.productService.getProductById(productId);
  }

  @Delete(":productId")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete a product by ID" })
  @ApiParam({ name: "id", type: Number })
  @Access(Role.ADMIN)
  async deleteProduct(@Param("id") productId: number) {
    return this.productService.deleteProduct(productId);
  }

  @Get("categories/:categoryId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get products by category with sorting" })
  @ApiParam({ name: "categoryId", type: Number })
  @ApiQuery({ name: "sortBy", enum: ["price", "name"], required: false })
  @ApiQuery({ name: "sortOrder", enum: ["asc", "desc"], required: false })
  @Access()
  async getProductsByCategoryWithSort(
    @Param("categoryId") categoryId: number,
    @Query("sortBy") sortBy: "price" | "name" = "name",
    @Query("sortOrder") sortOrder: "asc" | "desc" = "asc"
  ) {
    return this.productService.getProductsByCategoryWithSort(
      categoryId,
      sortBy,
      sortOrder
    );
  }

  @Get("favourites/check")
  @HttpCode(200)
  @ApiOperation({ summary: "Check if a product is in user's favourites" })
  @ApiQuery({ name: "userId", type: Number })
  @ApiQuery({ name: "productId", type: Number })
  @Access()
  async isProductInFavourites(
    @Query("userId") userId: number,
    @Query("productId") productId: number
  ) {
    return this.productService.isProductInFavourites(userId, productId);
  }

  @Get("favourites/:userId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get user's favourite products" })
  @ApiParam({ name: "userId", type: Number })
  @Access()
  async getUserFavouriteProducts(@Param("userId") userId: number) {
    return this.productService.getUserFavouriteProducts(userId);
  }
}
