import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import {
  Experience,
  ExperienceSchema,
} from '../database/models/experience.entity';
import { Location, LocationSchema } from '../database/models/location.entity';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'experiences', method: RequestMethod.POST });
  }
}
