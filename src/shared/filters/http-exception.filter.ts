import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    if (error.response.message?.length > 0) {
      error.response.errors = error.response.message;
      error.response.message =
        error.response.message ?? 'Validation error occured';
    }

    res.status(error.getStatus()).json({
      statusCode: error.getStatus(),
      error: error.response.name || error.response.error || error.name,
      message: error.response.message || error.response || error.message,
      errors: error.response.errors || null,
      timestamp: new Date().toISOString(),
      path: req?.url ?? null,
    });
  }
}
