import { INestApplication } from "@nestjs/common";
import helmet from "helmet";
//import * as compression from "compression";
import compression from "compression";
//import * as cors from "cors";
import cors from "cors";

export function setupMiddlewares(app: INestApplication) {
  app.use(helmet());
  app.use(compression());
  app.use(cors());
}
