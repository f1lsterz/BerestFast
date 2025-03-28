import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductParserService } from "../ProductParserService";

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductParserService],
})
export class ProductModule {}
