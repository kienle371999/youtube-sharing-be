import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/environment';
import initAPIDocs from './config/swagger';
import { AppErrorHandler } from './middleware/app-error-handler';

const globalPrefix = 'api';
const swaggerEndpoint = 'api-docs';

async function bootstrap() {
  const logger = new Logger('main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new AppErrorHandler(app.get(HttpAdapterHost).httpAdapter),
  );

  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, Cache-Control',
  });

  initAPIDocs({
    app,
    endpoint: 'api-docs',
    title: 'Youtube Sharing API Gateway document',
  });

  const port = ENV.PORT;

  await app.listen(port);

  logger.verbose(`====== App url: http://localhost:${port}/${globalPrefix}`);
  logger.verbose(
    `====== Swagger url: http://localhost:${port}/${swaggerEndpoint}`,
  );
}

bootstrap();
