import { Module } from "@nestjs/common";
import { AtbParserService } from "./atb.parser.service";
import { ParserController } from "./parser.controller";
import { CentralParkParserService } from "./park.parser.service";
import { SovaLoungeParserService } from "./sova.parser.service";

@Module({
  controllers: [ParserController],
  providers: [
    AtbParserService,
    CentralParkParserService,
    SovaLoungeParserService,
  ],
})
export class ParserModule {}
