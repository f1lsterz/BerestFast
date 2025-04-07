import { INestApplication } from "@nestjs/common";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

export function setupMiddlewares(app: INestApplication) {
  app.use(helmet());
  app.use(hpp());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many requests from this IP, please try again later",
    })
  );

  app.use(
    compression({
      level: 6,
      threshold: 1024,
    })
  );
}
