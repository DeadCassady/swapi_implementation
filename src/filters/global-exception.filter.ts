import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let details: unknown = null;

    // for an unusual HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || exceptionResponse;
      details = (exceptionResponse as any).error || null;
    }
    // for the unusual errors( TypeError, DatabaseError)
    else if (exception instanceof Error) {
      message = exception.message;
      details = process.env.NODE_ENV === 'development'
        ? { stack: exception.stack }
        : null;
    }

    // Logging the error (можна підключити Winston або інший логер)
    if (request.body == null) {
      console.error(`[${new Date().toISOString()}] Error: ${message}`, {
        path: request.url,
        method: request.method,
        details: exception,
      });
    } else {
      console.error(`[${new Date().toISOString()}] Error: ${message}`, {
        path: request.url,
        method: request.method,
        body: request.body,
        details: exception,
      });
    }

    // for sending a response 
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      details,
    });
  }
}
