import { Get, HttpStatus, Req } from '@nestjs/common';
import ENTITY_NAME from 'src/constant/entity-name';
import { ApiHandleResponse } from 'src/decorator/api.decorator';
import { IsAuthController } from 'src/decorator/auth.decorator';
import { RequestAuth } from 'src/dto/request.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@IsAuthController(ENTITY_NAME.USERS, 'User Auth', true)
export class UserAuthController {
  constructor(private readonly userService: UserService) {}

  @Get('/detail')
  @ApiHandleResponse({
    summary: 'Get user detail',
    type: User,
    httpStatus: HttpStatus.CREATED,
  })
  async createNewUser(@Req() req: RequestAuth) {
    return this.userService.getDetailById(req.user.sub);
  }
}
