import { IsSwaggerString } from 'src/decorator/swagger.decorator';

export class LoginUserDto {
  @IsSwaggerString({ default: 'dusainbolt@gmail.com' }, false)
  readonly email: string;

  @IsSwaggerString({ default: '123456' }, false)
  readonly password: string;
}

export class LoginUserResponse {
  @IsSwaggerString({ default: 'abc-xyz' })
  readonly token: string;
}
