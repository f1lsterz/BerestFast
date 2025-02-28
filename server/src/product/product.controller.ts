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

@ApiTags("Products")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new product" })
  @ApiBody({ type: CreateProductDto })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put(":productId")
  @HttpCode(200)
  @ApiOperation({ summary: "Update a product by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateProductDto })
  async updateProduct(
    @Param("id") productId: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all products" })
  async getAllProducts() {
    return this.productService.getAllProducts();
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
  async getRandomProducts(@Query("limit") limit?: number) {
    return this.productService.getRandomProducts(limit);
  }

  @Get(":id")
  @HttpCode(200)
  @ApiOperation({ summary: "Get a product by ID" })
  @ApiParam({ name: "id", type: Number })
  async getProductById(@Param("id") productId: number) {
    return this.productService.getProductById(productId);
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete a product by ID" })
  @ApiParam({ name: "id", type: Number })
  async deleteProduct(@Param("id") productId: number) {
    return this.productService.deleteProduct(productId);
  }

  @Get("category/:categoryId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get products by category with sorting" })
  @ApiParam({ name: "categoryId", type: Number })
  @ApiQuery({ name: "sortBy", enum: ["price", "name"], required: false })
  @ApiQuery({ name: "sortOrder", enum: ["asc", "desc"], required: false })
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

  @Get("price-range")
  @HttpCode(200)
  @ApiOperation({ summary: "Get products within a price range" })
  @ApiQuery({ name: "minPrice", type: Number })
  @ApiQuery({ name: "maxPrice", type: Number })
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
  async searchProducts(@Query("searchTerm") searchTerm: string) {
    return this.productService.searchProducts(searchTerm);
  }

  @Post("favourite")
  @HttpCode(201)
  @ApiOperation({ summary: "Add a product to favourites" })
  @ApiBody({
    schema: {
      properties: { userId: { type: "number" }, productId: { type: "number" } },
    },
  })
  async addToFavourites(@Body() body: { userId: number; productId: number }) {
    return this.productService.addToFavourites(body.userId, body.productId);
  }

  @Delete("favourite")
  @HttpCode(204)
  @ApiOperation({ summary: "Remove product from favourites" })
  @ApiQuery({ name: "userId", type: Number })
  @ApiQuery({ name: "productId", type: Number })
  async removeFromFavourites(
    @Query("userId") userId: number,
    @Query("productId") productId: number
  ) {
    return this.productService.removeFromFavourites(userId, productId);
  }

  @Get("favourite/:userId")
  @HttpCode(200)
  @ApiOperation({ summary: "Get user's favourite products" })
  @ApiParam({ name: "userId", type: Number })
  async getUserFavouriteProducts(@Param("userId") userId: number) {
    return this.productService.getUserFavouriteProducts(userId);
  }

  @Get("favourite/check")
  @HttpCode(200)
  @ApiOperation({ summary: "Check if a product is in user's favourites" })
  @ApiQuery({ name: "userId", type: Number })
  @ApiQuery({ name: "productId", type: Number })
  async isProductInFavourites(
    @Query("userId") userId: number,
    @Query("productId") productId: number
  ) {
    return this.productService.isProductInFavourites(userId, productId);
  }

  @Get("categories")
  @HttpCode(200)
  @ApiOperation({ summary: "Get all product categories" })
  async getCategories() {
    return this.productService.getCategories();
  }
}
