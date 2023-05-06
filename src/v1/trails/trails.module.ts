import { Module } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { TrailsController } from './trails.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Experience,
  ExperienceSchema,
} from '../database/models/experience.entity';
import { Location, LocationSchema } from '../database/models/location.entity';
import { Trail, TrailSchema } from '../database/models/trail.entity';

@Module({
  imports: [
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
export class TrailsModule {}
