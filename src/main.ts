import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AllExceptionsFilter } from './core/filter/any-exception.filter';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { GlobalInterceptor } from './core/interceptor/global.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);

  const prefix = config.get<string>('app.prefix');
  app.setGlobalPrefix(prefix);

  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cookbook API')
    .setDescription('菜谱管理接口文档')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${prefix}/swagger-ui`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Cookbook API Docs',
  });

  const port = config.get<number>('app.port') || 9001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/${prefix}/swagger-ui`);
}
bootstrap();
