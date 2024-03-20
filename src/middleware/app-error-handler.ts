import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpServer,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { isArray } from 'lodash';
import { AppError, ERROR_MSG } from 'src/constant/error';
import { RequestAuth } from 'src/dto/request.dto';

export class AppException extends HttpException {
  public errorCode: string;
  constructor(errorCode: ERROR_MSG, message?: string) {
    const { status, ...error } = AppError[errorCode];
    if (message) error.message = message;
    super(error, status);
    this.errorCode = error.code;
  }
}

@Catch()
export class AppErrorHandler extends BaseExceptionFilter {
  private readonly logger = new Logger(AppErrorHandler.name);

  constructor(applicationRef?: HttpServer) {
    super(applicationRef);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestAuth>();

    let tracePositionError = '';
    exception.stack
      .split('\n')
      .slice(1)
      .map((r) => r.match(/\((?<file>.*):(?<line>\d+):(?<pos>\d+)\)/))
      .forEach((r) => {
        if (r && r.groups && r.groups.file.substr(0, 8) !== 'internal') {
          const { file, line, pos } = r.groups;
          tracePositionError += `\n${file} at ${line}:${pos}`;
        }
      });

    // TODO handle store log

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = '';
    if (exception?.getResponse) {
      message =
        typeof exception.getResponse() === 'object'
          ? (exception.getResponse() as any).message
          : exception.getResponse();
    } else {
      message = exception.toString();
    }
    const errorResponse = {
      status,
      data: {
        error: getReasonPhrase(status),
        message,
        errorCode:
          exception instanceof BadRequestException
            ? HttpStatus.BAD_REQUEST.toString()
            : exception instanceof AppException
              ? exception.errorCode
              : HttpStatus.INTERNAL_SERVER_ERROR.toString(),
      },
    };

    if (isArray(errorResponse.data.message)) {
      errorResponse.data.message = errorResponse.data.message[0];
    }

    this.logger.error(
      `${request.method} ${request.url} ${JSON.stringify(
        errorResponse,
      )} ${tracePositionError}`,
    );

    return response?.status(status).json(errorResponse);
  }
}
