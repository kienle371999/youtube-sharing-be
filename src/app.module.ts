import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLogMiddleware } from './middleware/request-log.middleware';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { VideoModule } from './api/video/video.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    // ENTITY MODULE
    UserModule,
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLogMiddleware).forRoutes('*');
  }
}
