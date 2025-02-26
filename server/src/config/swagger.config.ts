import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Dely API")
  .setDescription("API documentation for Dely application")
  .setVersion("1.0")
  //.addBearerAuth()
  .build();
