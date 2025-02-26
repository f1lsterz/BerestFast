import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationFilter } from "./common/filters/validation.filter";
import { validationConfig } from "./config/validation.config";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("config.server.port") || 3000;

  app.useGlobalPipes(validationConfig);
  app.useGlobalFilters(new ValidationFilter());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
  console.log(`Started server on localhost:${port}`);
  console.log(`📄 Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
