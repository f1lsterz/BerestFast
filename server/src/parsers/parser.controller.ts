import { Controller, Get, Query } from "@nestjs/common";
import {
  AtbParserService,
  ScrapedProduct,
  Category,
} from "./atb.parser.service";
import { NoTimeout } from "src/common/decorators/no.timeout.decorator";
import { categories, CentralParkParserService } from "./park.parser.service";
import { SovaLoungeParserService, sovaUrl } from "./sova.parser.service";
import { CafeCategory } from "./types/menu";
import { AddressInfo } from "./types/address";
import { OpeningHours } from "./types/hours";

@Controller("parser")
export class ParserController {
  constructor(
    private readonly atb: AtbParserService,
    private readonly park: CentralParkParserService,
    private readonly sova: SovaLoungeParserService
  ) {}

  @Get("atbpage")
  @NoTimeout()
  async parseAtb(@Query("url") url: string): Promise<ScrapedProduct[]> {
    return this.atb.parsePage(url);
  }

  @Get("atbcategories")
  async getCategories(): Promise<Category[]> {
    return this.atb.parseCategories();
  }

  @Get("category-all-pages")
  @NoTimeout()
  async getCategoryAllPages(
    @Query("url") url: string
  ): Promise<ScrapedProduct[]> {
    return this.atb.parseCategoryAllPages(url);
  }

  @Get("all-categories-all-pages")
  @NoTimeout()
  async getAllCategoriesAllPages(): Promise<Record<string, ScrapedProduct[]>> {
    return this.atb.parseAllCategories();
  }

  @Get("park")
  @NoTimeout()
  async parsePark(): Promise<CafeCategory[]> {
    return this.park.parseMenu();
  }

  @Get("parkLogo")
  @NoTimeout()
  async parseParkLogo(): Promise<string> {
    return this.park.parseLogo(categories[0].url);
  }

  @Get("parkAddress")
  @NoTimeout()
  async parseParkAddress(): Promise<AddressInfo> {
    return this.park.parseAddress(categories[0].url);
  }

  @Get("parkOpeningHours")
  @NoTimeout()
  async parseParkOpeningHours(): Promise<OpeningHours[]> {
    return this.park.parseOpeningHours(categories[0].url);
  }

  @Get("sova")
  @NoTimeout()
  async parseSova(): Promise<CafeCategory[]> {
    return this.sova.parseMenu();
  }

  @Get("sovaLogo")
  @NoTimeout()
  async parseSovaLogo(): Promise<string> {
    return this.sova.parseLogo(sovaUrl);
  }

  @Get("sovaAddress")
  @NoTimeout()
  async parseSovaAddress(): Promise<AddressInfo> {
    return this.sova.parseAddress(sovaUrl);
  }

  @Get("sovaOpeningHours")
  @NoTimeout()
  async parseSovaOpeningHours(): Promise<OpeningHours[]> {
    return this.sova.parseOpeningHours(sovaUrl);
  }
}
