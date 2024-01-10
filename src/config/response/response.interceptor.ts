import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, throwError, timeout } from "rxjs";
import { ZodError } from "zod";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(15000),
      map((data) => ({
        meta: {
          code: context.switchToHttp().getResponse().statusCode,
          status: 'success',
          message: 'Operation successfully',
        },
        data,
      })),
      catchError((err) => {
        if (err instanceof ZodError) {
          const status_code = HttpStatus.UNPROCESSABLE_ENTITY;
          const message = 'Validation failed';
          const validationErrors = err.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          }));

          return throwError(() => {
            return new HttpException(
              {
                meta: {
                  code: status_code,
                  status: 'error',
                  message: message,
                },
                data: validationErrors,
              },
              status_code,
            );
          });
        }
        else {
          const status_code = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
          const message = err.name || 'Internal Server Error';
          let error = err.message || 'error';
          return throwError(() => {
            return new HttpException(
              {
                meta: {
                  code: status_code, 
                  status: 'error',
                  message: message,
                },
                data: {
                  error: error,
                },
              },
              status_code
            );
          });
        }
      }),
    );
  }
}