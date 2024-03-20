import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ENV } from './config/environment';
import initAPIDocs from './config/swagger';
import { AppErrorHandler } from './middleware/app-error-handler';

async function bootstrap() {
  const logger = new Logger('main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api`);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppErrorHandler(httpAdapter));

  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  initAPIDocs({
    app,
    title: 'Youtube Sharing API Gateway document',
    endpoint: 'api-docs',
  });

  const port = ENV.PORT;

  await app.listen(port);

  logger.verbose(`====== App listen on port ${port} ======`);
  logger.verbose(`====== Swagger url: http://localhost:${port}/api-docs`);
}
bootstrap();
