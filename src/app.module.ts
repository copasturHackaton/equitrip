import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocationsModule } from './v1/locations/locations.module';
import { ExperiencesModule } from './v1/experiences/experiences.module';
import { TrailsModule } from './v1/trails/trails.module';
import { UserModule } from './v1/users/users.module';
import { HealthcheckModule } from './v1/healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async function (configService: ConfigService) {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    LocationsModule,
    ExperiencesModule,
    TrailsModule,
    UserModule,
    HealthcheckModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
