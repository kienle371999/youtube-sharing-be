import { Request } from 'express';

export interface IRequestResponse<T> {
  status: '1' | '0';
  message: 'OK';
  result: T;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface JWTPayload {
  sub: number;
  credential: string;
}

export interface RequestAuth extends Request {
  user: JWTPayload;
}
