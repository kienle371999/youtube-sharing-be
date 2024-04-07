import { IsSwaggerString } from 'src/decorator/swagger.decorator';

export class CreateUserDto {
  @IsSwaggerString({ default: 'dusainbolt' }, false)
  readonly username: string;

  @IsSwaggerString({ default: 'dusainbolt@gmail.com' }, false)
  readonly email: string;

  @IsSwaggerString({ default: '123456' }, false)
  readonly password: string;
}
