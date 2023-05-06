import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as http from 'http';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

function swaggerConfig() {
  const config = new DocumentBuilder()
    .setTitle('API Copastur')
    .setDescription('Monolito responsável pelo backend do software Copastur.')
    .setVersion('1.0')
    .addSecurity('TokenAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements('TokenAuth')
    .build();

  return config;
}

async function bootstrap() {
  http.get({ host: 'api.ipify.org', port: 80, path: '/' });
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('/api/v1/copastur');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const document = SwaggerModule.createDocument(app, swaggerConfig());
  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
