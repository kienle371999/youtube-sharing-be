import { HttpStatus } from '@nestjs/common';
import {
  IsSwaggerDto,
  IsSwaggerNumber,
  IsSwaggerString,
} from '../decorator/swagger.decorator';

export class ErrorDataResponse {
  @IsSwaggerString({})
  code: string;

  @IsSwaggerString({})
  message: string;

  @IsSwaggerString({})
  error: HttpStatus;
}

export class DefaultResponse {
  @IsSwaggerNumber({})
  status: number;

  @IsSwaggerDto(ErrorDataResponse)
  data: ErrorDataResponse;
}
