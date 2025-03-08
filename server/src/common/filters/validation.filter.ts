import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from "@nestjs/common";
import { ApiError } from "src/common/errors/apiError"; // ваш клас помилки

@Catch(ApiError)
export class ApiErrorFilter implements ExceptionFilter {
  catch(exception: ApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || 500; // Використовуємо статус з ApiError

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
