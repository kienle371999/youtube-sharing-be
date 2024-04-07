import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ENV } from 'src/config/environment';
import { ERROR_MSG } from 'src/constant/error';
import { JWTPayload, UserRole } from 'src/dto/request.dto';
import { CreateUserDto } from 'src/dto/user-dto/create-user-dto';
import { LoginUserDto } from 'src/dto/user-dto/login-user-dto';
import { User } from 'src/entities/user.entity';
import { AppException } from 'src/middleware/app-error-handler';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createNew(body: CreateUserDto): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ email: body.email });
    if (user) {
      throw new AppException(ERROR_MSG.USER_EXIST);
    }

    const newUser = new User();
    newUser.username = body.username;
    newUser.email = body.email;
    newUser.password = body.password;
    await this.userRepo.save(newUser);
    return true;
  }

  async login(body: LoginUserDto) {
    const user = await this.userRepo.findOneBy({ email: body.email });

    if (!user) throw new AppException(ERROR_MSG.USER_NOT_EXIST);

    const passwordMatches = body.password === user.password;
    if (!passwordMatches)
      throw new AppException(ERROR_MSG.PASSWORD_NOT_CORRECT);

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        credential: user.username,
        role: UserRole.USER,
      } as JWTPayload,
      {
        secret: ENV.JWT.JWT_SECRET,
        expiresIn: ENV.JWT.JWT_EXPIRE_IN,
      },
    );
    return { token };
  }

  async getDetailById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      select: {
        id: true,
        email: true,
        username: true,
      },
      where: {
        id,
      },
    });
    if (!user) throw new AppException(ERROR_MSG.USER_NOT_EXIST);
    return user;
  }
}
