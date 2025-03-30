import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Cache } from "cache-manager";
import { PrismaService } from "../prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";

describe("ProductService", () => {
  let service: ProductService;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: prisma },
        { provide: CACHE_MANAGER, useValue: cacheManager },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // ---------- CRUD METHODS ----------

  describe("createProduct", () => {
    it("should create a product and invalidate cache", async () => {
      const dto: CreateProductDto = {
        name: "Test Product",
        description: "Test Description",
        price: 100.5,
        image_url: "https://example.com/image.jpg",
        unit: "PIECE",
        categoryId: 1,
      };

      (prisma.product.create as jest.Mock).mockResolvedValue({ id: 1, ...dto });

      const result = await service.createProduct(dto);

      expect(prisma.product.create).toHaveBeenCalledWith({ data: dto });
      expect(cacheManager.del).toHaveBeenCalledWith("products");
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe("getProductById", () => {
    it("should return product from cache if exists", async () => {
      const cachedProduct = { id: 1, name: "Cached Product" };
      cacheManager.get.mockResolvedValue(cachedProduct);

      const result = await service.getProductById(1);

      expect(cacheManager.get).toHaveBeenCalledWith("product:1");
      expect(result).toEqual(cachedProduct);
    });

    it("should return product from DB and cache it if not in cache", async () => {
      const product = { id: 1, name: "DB Product" };
      cacheManager.get.mockResolvedValue(null);
      (prisma.product.findUnique as jest.Mock).mockResolvedValue(product);

      const result = await service.getProductById(1);

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(cacheManager.set).toHaveBeenCalledWith("product:1", product, 3600);
      expect(result).toEqual(product);
    });
  });

  describe("updateProduct", () => {
    it("should update a product and invalidate cache", async () => {
      const dto: UpdateProductDto = { name: "Updated Product" };
      const updatedProduct = { id: 1, ...dto };

      (prisma.product.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await service.updateProduct(1, dto);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(cacheManager.del).toHaveBeenCalledWith("product:1");
      expect(cacheManager.del).toHaveBeenCalledWith("products");
      expect(result).toEqual(updatedProduct);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product and invalidate cache", async () => {
      const deletedProduct = { id: 1, name: "Deleted Product" };

      (prisma.product.delete as jest.Mock).mockResolvedValue(deletedProduct);

      const result = await service.deleteProduct(1);

      expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cacheManager.del).toHaveBeenCalledWith("product:1");
      expect(cacheManager.del).toHaveBeenCalledWith("products");
      expect(result).toEqual(deletedProduct);
    });
  });

  describe("getAllProducts", () => {
    it("should return products from cache if available", async () => {
      const cachedProducts = [{ id: 1, name: "Cached Product" }];
      cacheManager.get.mockResolvedValue(cachedProducts);

      const result = await service.getAllProducts();

      expect(result).toEqual(cachedProducts);
    });

    it("should return products from DB if not cached and cache them", async () => {
      const dbProducts = [{ id: 1, name: "DB Product" }];
      cacheManager.get.mockResolvedValue(null);
      (prisma.product.findMany as jest.Mock).mockResolvedValue(dbProducts);

      const result = await service.getAllProducts();

      expect(prisma.product.findMany).toHaveBeenCalled();
      expect(cacheManager.set).toHaveBeenCalledWith("products", dbProducts, 0);
      expect(result).toEqual(dbProducts);
    });
  });

  // ---------- ADDITIONAL METHODS ----------

  describe("getRandomProducts", () => {
    it("should return random products without limit", async () => {
      const randomProducts = [{ id: 1, name: "Random Product" }];
      (prisma.$queryRaw as unknown as jest.Mock).mockResolvedValue(
        randomProducts
      );

      const result = await service.getRandomProducts();

      // Перевірка: $queryRaw викликаний із шаблонним літералом
      const callArgs = (prisma.$queryRaw as unknown as jest.Mock).mock.calls[0];
      // Перевіряємо, що перший аргумент (масив рядків) містить ORDER BY RAND()
      expect(callArgs[0][0]).toContain("ORDER BY RAND()");
      expect(result).toEqual(randomProducts);
    });

    it("should return random products with a limit", async () => {
      const randomProducts = [{ id: 1, name: "Random Product" }];
      (prisma.$queryRaw as unknown as jest.Mock).mockResolvedValue(
        randomProducts
      );

      const result = await service.getRandomProducts(5);

      // Отримуємо аргументи виклику $queryRaw
      const callArgs = (prisma.$queryRaw as unknown as jest.Mock).mock.calls[0];
      // callArgs[0] — це масив рядків шаблонного літерала
      expect(callArgs[0][1]).toContain(" LIMIT ");
      // callArgs[2] має дорівнювати 5
      expect(callArgs[2]).toBe(5);
      expect(result).toEqual(randomProducts);
    });
  });

  describe("getProductsByCategoryWithSort", () => {
    it("should return products filtered by category and sorted", async () => {
      const categoryId = 2;
      const sortBy: "price" | "name" = "price";
      const sortOrder: "asc" | "desc" = "asc";
      const products = [
        { id: 1, name: "A", price: 10, categoryId },
        { id: 2, name: "B", price: 20, categoryId },
      ];

      (prisma.product.findMany as jest.Mock).mockResolvedValue(products);

      const result = await service.getProductsByCategoryWithSort(
        categoryId,
        sortBy,
        sortOrder
      );

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { categoryId },
        orderBy: { [sortBy]: sortOrder },
      });
      expect(result).toEqual(products);
    });
  });

  describe("getProductsByPriceRange", () => {
    it("should return products within given price range", async () => {
      const minPrice = 50;
      const maxPrice = 150;
      const products = [
        { id: 1, name: "Product 1", price: 75 },
        { id: 2, name: "Product 2", price: 125 },
      ];

      (prisma.product.findMany as jest.Mock).mockResolvedValue(products);

      const result = await service.getProductsByPriceRange(minPrice, maxPrice);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { price: { gte: minPrice, lte: maxPrice } },
      });
      expect(result).toEqual(products);
    });
  });

  describe("searchProducts", () => {
    it("should search products by term", async () => {
      const searchTerm = "Test";
      const expectedProducts = [{ id: 1, name: "Test Product" }];

      (prisma.$queryRaw as unknown as jest.Mock).mockResolvedValue(
        expectedProducts
      );

      const result = await service.searchProducts(searchTerm);

      const callArgs = (prisma.$queryRaw as unknown as jest.Mock).mock.calls[0];
      // Перевіряємо, що шаблон містить конструкцію LIKE LOWER('%...%')
      expect(callArgs[0][0]).toContain("LIKE LOWER('%");
      expect(callArgs[0][0]).toContain("%')");
      expect(result).toEqual(expectedProducts);
    });
  });

  // ---------- FAVOURITES METHODS ----------

  describe("addToFavourites", () => {
    it("should add product to favourites", async () => {
      const expectedResult = { userId: 1, productId: 2 };

      (prisma.favourite_Product.create as jest.Mock).mockResolvedValue(
        expectedResult
      );

      const result = await service.addToFavourites(1, 2);

      expect(prisma.favourite_Product.create).toHaveBeenCalledWith({
        data: { userId: 1, productId: 2 },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("removeFromFavourites", () => {
    it("should remove product from favourites", async () => {
      const expectedResult = { userId: 1, productId: 2 };

      (prisma.favourite_Product.delete as jest.Mock).mockResolvedValue(
        expectedResult
      );

      const result = await service.removeFromFavourites(1, 2);

      expect(prisma.favourite_Product.delete).toHaveBeenCalledWith({
        where: { userId_productId: { userId: 1, productId: 2 } },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("isProductInFavourites", () => {
    it("should check if product is in favourites", async () => {
      const favourite = { userId: 1, productId: 2 };

      (prisma.favourite_Product.findUnique as jest.Mock).mockResolvedValue(
        favourite
      );

      const result = await service.isProductInFavourites(1, 2);

      expect(prisma.favourite_Product.findUnique).toHaveBeenCalledWith({
        where: { userId_productId: { userId: 1, productId: 2 } },
      });
      expect(result).toEqual(favourite);
    });
  });

  describe("getUserFavouriteProducts", () => {
    it("should return favourite products from cache if available", async () => {
      const cachedFavourites = [{ userId: 1, productId: 2 }];
      cacheManager.get.mockResolvedValue(cachedFavourites);

      const result = await service.getUserFavouriteProducts(1);

      expect(cacheManager.get).toHaveBeenCalledWith("user:1:favourites");
      expect(result).toEqual(cachedFavourites);
    });

    it("should return favourite products from DB and cache them if not in cache", async () => {
      const favourites = [{ userId: 1, productId: 2 }];
      cacheManager.get.mockResolvedValue(null);
      (prisma.favourite_Product.findMany as jest.Mock).mockResolvedValue(
        favourites
      );

      const result = await service.getUserFavouriteProducts(1);

      expect(prisma.favourite_Product.findMany).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
      expect(cacheManager.set).toHaveBeenCalledWith(
        "user:1:favourites",
        favourites,
        3600
      );
      expect(result).toEqual(favourites);
    });
  });

  // ---------- CATEGORIES ----------

  describe("getCategories", () => {
    it("should return categories from cache if available", async () => {
      const cachedCategories = [{ id: 1, name: "Category 1" }];
      cacheManager.get.mockResolvedValue(cachedCategories);

      const result = await service.getCategories();

      expect(cacheManager.get).toHaveBeenCalledWith("categories");
      expect(result).toEqual(cachedCategories);
    });

    it("should return categories from DB if not cached and cache them", async () => {
      const categories = [{ id: 1, name: "Category 1" }];
      cacheManager.get.mockResolvedValue(null);
      (prisma.category.findMany as jest.Mock).mockResolvedValue(categories);

      const result = await service.getCategories();

      expect(prisma.category.findMany).toHaveBeenCalled();
      expect(cacheManager.set).toHaveBeenCalledWith(
        "categories",
        categories,
        3600
      );
      expect(result).toEqual(categories);
    });
  });
});
