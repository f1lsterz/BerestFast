import { Controller, Get, Query } from "@nestjs/common";
import { ChoiceQRService } from "./choiceqr.service";

@Controller("parser")
export class ChoiceQRController {
  constructor(private readonly qrService: ChoiceQRService) {}

  @Get("menu")
  async getMenu(@Query("section") section: string) {
    return this.qrService.fetchMenuFromApi(section);
  }
}
