import { Module } from "@nestjs/common";
import { ChoiceQRService } from "./choiceqr.service";
import { ChoiceQRController } from "./choiceqr.controller";

@Module({
  controllers: [ChoiceQRController],
  providers: [ChoiceQRService],
})
export class ChoiceQRModule {}
