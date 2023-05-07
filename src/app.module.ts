import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocationsModule } from './v1/locations/locations.module';
import { ExperiencesModule } from './v1/experiences/experiences.module';
import { TrailsModule } from './v1/trails/trails.module';
import { UserModule } from './v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TODO: (maybe) refactor to get this info from database file
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    LocationsModule,
    ExperiencesModule,
    TrailsModule,
    UserModule,
    /*TypeOrmModule.forRoot(configTypeorm)*/
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
