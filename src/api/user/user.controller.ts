import { Body, HttpStatus, Post } from '@nestjs/common';
import ENTITY_NAME from 'src/constant/entity-name';
import { ApiHandleResponse } from 'src/decorator/api.decorator';
import { IsAuthController } from 'src/decorator/auth.decorator';
import { CreateUserDto } from 'src/dto/user-dto/create-user-dto';
import {
  LoginUserDto,
  LoginUserResponse,
} from 'src/dto/user-dto/login-user-dto';
import { UserService } from './user.service';

@IsAuthController(ENTITY_NAME.USERS, 'User Public', false)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiHandleResponse({
    summary: 'Create a new user',
    type: Boolean,
    httpStatus: HttpStatus.CREATED,
  })
  async createNewUser(@Body() body: CreateUserDto) {
    return this.userService.createNew(body);
  }

  @Post('/login')
  @ApiHandleResponse({
    summary: 'Login user account',
    type: LoginUserResponse,
    httpStatus: HttpStatus.CREATED,
  })
  async login(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }
}
