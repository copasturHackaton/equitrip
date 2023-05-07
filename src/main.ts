import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

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
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const origin = configService.get<string>('FRONT_END_HOST');
  const env = configService.get<string>('NODE_ENV');

  if (env === 'production') {
    app.enableCors({
      allowedHeaders: ['Content-Type', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      origin: [origin, origin.replace('www', '')],
      credentials: true,
    });
  } else {
    app.enableCors({
      allowedHeaders: '*',
      methods: '*',
      origin: '*',
      credentials: true,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  app.setGlobalPrefix('/api/v1');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const document = SwaggerModule.createDocument(app, swaggerConfig());
  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
