import { INestApplication } from "@nestjs/common";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import rateLimit from "express-rate-limit";

export function setupMiddlewares(app: INestApplication) {
  app.use(cors());

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 хвилин
      max: 100, // Макс. 100 запитів з одного IP
      message: "Too many requests from this IP, please try again later",
    })
  );

  app.use(
    compression({
      level: 6, // Оптимальний рівень стиснення
      threshold: 1024, // Стискати тільки якщо відповідь > 1KB
    })
  );
}
