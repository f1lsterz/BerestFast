import { Controller, Get, Query } from "@nestjs/common";
import {
  AtbParserService,
  ScrapedProduct,
  Category,
} from "./atb.parser.service";
import { NoTimeout } from "src/common/decorators/no.timeout.decorator";

@Controller("parser")
export class ParserController {
  constructor(private readonly atbParserService: AtbParserService) {}

  @Get("atbpage")
  @NoTimeout()
  async parseAtb(@Query("url") url: string): Promise<ScrapedProduct[]> {
    return this.atbParserService.parsePage(url);
  }

  @Get("atbcategories")
  async getCategories(): Promise<Category[]> {
    return this.atbParserService.parseCategories();
  }

  @Get("category-all-pages")
  @NoTimeout()
  async getCategoryAllPages(
    @Query("url") url: string
  ): Promise<ScrapedProduct[]> {
    return this.atbParserService.parseCategoryAllPages(url);
  }

  @Get("all-categories-all-pages")
  @NoTimeout()
  async getAllCategoriesAllPages(): Promise<Record<string, ScrapedProduct[]>> {
    return this.atbParserService.parseAllCategories();
  }
}
