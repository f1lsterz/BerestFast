import { Module } from "@nestjs/common";
import { ProductService } from "@product/product.service";
import { ProductController } from "@product/product.controller";
import { ProductParserService } from "src/ProductParserService";

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductParserService],
})
export class ProductModule {}
