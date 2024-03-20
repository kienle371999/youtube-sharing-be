import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const SuccessStatusCode = [HttpStatus.CREATED, HttpStatus.OK];
@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
  private logger = new Logger('HttpRequest');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      if (SuccessStatusCode.includes(statusCode)) {
        this.logger.verbose(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      }
    });

    next();
  }
}
