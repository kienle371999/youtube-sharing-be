import { HttpStatus } from '@nestjs/common';

export interface IAppError {
  code: string;
  message: string;
  status: HttpStatus;
}

export enum ERROR_MSG {
  // BASE MSG
  BASE_ERROR = 'BASE_ERROR',

  // AUTH MSG
  AUTH_UNAUTHORIZED_TOKEN = 'AUTH_UNAUTHORIZED_TOKEN',
  AUTH_TOKEN_CLAIMS_BEFORE = 'AUTH_TOKEN_CLAIMS_BEFORE',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_FORBIDDEN_ACCOUNT = 'AUTH_FORBIDDEN_ACCOUNT',

  // USER MSG
  USER_NOT_EXIST = 'USER_NOT_EXIST',
  USER_EXIST = 'USER_EXIST',
  PASSWORD_NOT_CORRECT = 'PASSWORD_NOT_CORRECT',

  // VIDEO MSG
  VIDEO_EXIST = 'VIDEO_EXIST',
}

export const AppError: Record<ERROR_MSG, IAppError> = {
  // BASE_ERROR
  [ERROR_MSG.BASE_ERROR]: {
    code: '-1',
    message: 'Error default',
    status: HttpStatus.BAD_REQUEST,
  },

  //AUTH
  [ERROR_MSG.AUTH_TOKEN_CLAIMS_BEFORE]: {
    code: ERROR_MSG.AUTH_TOKEN_CLAIMS_BEFORE,
    message: 'Your token has been claims before create',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_MSG.AUTH_TOKEN_EXPIRED]: {
    code: 'AUTH_TOKEN_EXPIRED',
    message: 'Your token have been expired',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_MSG.AUTH_TOKEN_INVALID]: {
    code: 'AUTH_TOKEN_INVALID',
    message: 'Your token is invalid',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_MSG.AUTH_UNAUTHORIZED_TOKEN]: {
    code: 'AUTH_UNAUTHORIZED_TOKEN',
    message: 'Auth is false',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_MSG.AUTH_FORBIDDEN_ACCOUNT]: {
    code: 'AUTH_FORBIDDEN_ACCOUNT',
    message: 'Access denied',
    status: HttpStatus.FORBIDDEN,
  },

  // USER ERROR
  [ERROR_MSG.USER_NOT_EXIST]: {
    code: 'USER_NOT_EXIST',
    message: 'User does not exist',
    status: HttpStatus.NOT_FOUND,
  },
  [ERROR_MSG.USER_EXIST]: {
    code: 'USER_EXIST',
    message: 'User exists',
    status: HttpStatus.BAD_REQUEST,
  },
  [ERROR_MSG.PASSWORD_NOT_CORRECT]: {
    code: 'PASSWORD_NOT_CORRECT',
    message: 'Password not correct',
    status: HttpStatus.BAD_REQUEST,
  },

  // VIDEO ERROR
  [ERROR_MSG.VIDEO_EXIST]: {
    code: 'VIDEO_EXIST',
    message: 'Video exists',
    status: HttpStatus.BAD_REQUEST,
  },
};
