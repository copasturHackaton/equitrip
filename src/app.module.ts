import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configTypeorm } from './database/config-typeorm';
import { Test2Module } from './modules/test2/test2.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Test2Module /*TypeOrmModule.forRoot(configTypeorm)*/,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
