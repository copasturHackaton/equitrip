import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import {
  Experience,
  ExperienceSchema,
} from '../database/models/experience.entity';
import { Location, LocationSchema } from '../database/models/location.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule {}
