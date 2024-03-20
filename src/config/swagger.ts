import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const initAPIDocs = ({
  app,
  endpoint,
  title,
  version,
}: {
  app;
  endpoint: string;
  title: string;
  version?: string;
}): void => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(title)
    .setVersion(version || '1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(endpoint, app, document);
};

export default initAPIDocs;
