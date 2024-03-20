import { IsSwaggerString } from 'src/decorator/swagger.decorator';

export class CreateVideoDto {
  @IsSwaggerString()
  readonly url: string;
}
