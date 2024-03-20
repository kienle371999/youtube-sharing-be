import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinDate,
  MinLength,
  ValidateNested,
} from 'class-validator';
import COMMON from '../constant/common';

const ApiPropType = (type, isRequire, options: ApiPropertyOptions) =>
  applyDecorators(
    ApiProperty({
      type,
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
  );

export function IsSwaggerString(
  options: ApiPropertyOptions = {},
  isRequire = true,
) {
  return applyDecorators(
    ApiPropType('string', isRequire, options),
    IsString(),
    MaxLength(options?.maxLength),
    MinLength(options?.minLength),
  );
}

export function IsSwaggerNumber(
  options: ApiPropertyOptions = {},
  isRequire = true,
) {
  return applyDecorators(
    ApiPropType('number', isRequire, options),
    Type(() => Number),
    IsNumber(),
  );
}

export function IsSwaggerBoolean(
  options: ApiPropertyOptions = {},
  isRequire = true,
) {
  return applyDecorators(
    ApiPropType('boolean', isRequire, options),
    IsBoolean(),
  );
}

export function IsSwaggerEnum(
  options: ApiPropertyOptions = {},
  isRequire = true,
) {
  return applyDecorators(
    ApiPropType('enum', isRequire, options),
    ...(!isRequire
      ? [Transform((params) => (params.value === '' ? null : params.value))]
      : []),
    IsEnum(options.enum),
  );
}

export function IsSwaggerDto(type) {
  return applyDecorators(
    ApiProperty({ type }),
    ValidateNested({ each: true }),
    IsDefined(),
    Type(() => type),
  );
}

export function IsSwaggerDate(
  options: ApiPropertyOptions = {},
  isRequire = true,
) {
  return applyDecorators(
    ApiPropType('date', isRequire, {
      description: `Example: ${new Date().toISOString()}`,
      ...options,
    }),
    IsDate(),
    Type(() => Date),
    MinDate(COMMON.minDate),
  );
}

export function IsSwaggerArray(
  options: ApiPropertyOptions = {},
  isRequire = true,
) {
  return applyDecorators(
    ApiProperty({
      isArray: true,
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    ...(isRequire ? [ArrayNotEmpty()] : []),
  );
}
