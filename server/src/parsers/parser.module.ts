import { Module } from "@nestjs/common";
import { AtbParserService } from "./atb.parser.service";
import { ParserController } from "./parser.controller";

@Module({
  providers: [AtbParserService],
  controllers: [ParserController],
})
export class ParserModule {}
