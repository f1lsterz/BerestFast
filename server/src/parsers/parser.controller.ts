import { Controller, Get, Query } from "@nestjs/common";
import {
  AtbParserService,
  ScrapedProduct,
  Category,
} from "./atb.parser.service";
import { NoTimeout } from "src/common/decorators/no.timeout.decorator";
import { CafeCategory, CentralParkParserService } from "./park.parser.service";
import {
  AddressInfo,
  OpeningHours,
  SovaLoungeParserService,
} from "./sova.parser.service";

@Controller("parser")
export class ParserController {
  constructor(
    private readonly atbParserService: AtbParserService,
    private readonly parkParserService: CentralParkParserService,
    private readonly sovaParserService: SovaLoungeParserService
  ) {}

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

  @Get("park")
  @NoTimeout()
  async parsePark(): Promise<CafeCategory[]> {
    return this.parkParserService.parseMenu();
  }

  @Get("sova")
  @NoTimeout()
  async parseSova(): Promise<CafeCategory[]> {
    return this.sovaParserService.parseMenu();
  }

  @Get("sovaLogo")
  @NoTimeout()
  async parseSovaLogo(): Promise<string> {
    return this.sovaParserService.parseLogo();
  }

  @Get("sovaAddress")
  @NoTimeout()
  async parseSovaAddress(): Promise<AddressInfo> {
    return this.sovaParserService.parseAddress();
  }

  @Get("sovaOpeningHours")
  @NoTimeout()
  async parseSovaOpeningHours(): Promise<OpeningHours[]> {
    return this.sovaParserService.parseOpeningHours();
  }

  @Get("parkLogo")
  @NoTimeout()
  async parseParkLogo(): Promise<string> {
    return this.parkParserService.parseLogo();
  }

  @Get("parkAddress")
  @NoTimeout()
  async parseParkAddress(): Promise<AddressInfo> {
    return this.parkParserService.parseAddress();
  }

  @Get("parkOpeningHours")
  @NoTimeout()
  async parseParkOpeningHours(): Promise<OpeningHours[]> {
    return this.parkParserService.parseOpeningHours();
  }
}
