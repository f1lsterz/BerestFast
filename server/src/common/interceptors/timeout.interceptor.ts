import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, throwError, TimeoutError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";
import { ApiError } from "../errors/apiError";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(10000),
      catchError((err) =>
        throwError(() =>
          err instanceof TimeoutError
            ? ApiError.RequestTimeout("Operation timed out after 10s")
            : err
        )
      )
    );
  }
}
