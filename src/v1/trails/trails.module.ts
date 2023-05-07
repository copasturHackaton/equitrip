import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TrailsService } from './trails.service';
import { TrailsController } from './trails.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Experience,
  ExperienceSchema,
} from '../database/models/experience.entity';
import { Location, LocationSchema } from '../database/models/location.entity';
import { Trail, TrailSchema } from '../database/models/trail.entity';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
    ]),
    MongooseModule.forFeature([{ name: Trail.name, schema: TrailSchema }]),
  ],
  controllers: [TrailsController],
  providers: [TrailsService],
})
export class TrailsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'trails', method: RequestMethod.POST });
  }
}
