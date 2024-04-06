import { IsSwaggerString } from 'src/decorator/swagger.decorator';

export class CreateVideoDto {
  @IsSwaggerString()
  readonly url: string;
}

export interface CreateVideoPayload {
  url: string;
  userId: number;
}

export interface CreateVideoEvent {
  name: string;
  title: string;
}
