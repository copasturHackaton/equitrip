import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Experience } from '../database/models/experience.entity';
import { Trail } from '../database/models/trail.entity';
import { sortOptions } from 'utils/enums';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { FindAllTrailsResponseDto } from './dto/find-all-trails-response.dto';

@Injectable()
export class TrailsService {
  constructor(
    @InjectModel(Experience.name) private experienceModel: Model<Experience>,
    @InjectModel(Trail.name) private trailModel: Model<Trail>,
  ) {}

  async create(createTrailDto: CreateTrailDto): Promise<Experience> {
    try {
      const experiencesExist = await this.experienceModel
        .find({
          $or: createTrailDto
            .getExperiences()
            .map((experience) => ({ _id: experience.experienceId })),
        })
        .lean()
        .exec();

      // TODO: create custom error to return the right status code and message
      if (!experiencesExist.length) {
        throw new Error('Location not found');
      }

      const createdLocation = new this.trailModel(createTrailDto);
      return (await createdLocation.save()).toObject();
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(
    offset = 0,
    limit = 10,
    sort?: sortOptions,
  ): Promise<FindAllTrailsResponseDto> {
    const trailsQuery = this.trailModel.find().skip(offset).limit(limit);

    if (sort) {
      trailsQuery.sort({ updatedAt: sort });
    }

    const trails = await trailsQuery.lean().exec();
    const count = await this.trailModel.countDocuments();

    return {
      count,
      trails,
    };
  }

  async findOne(id: string) {
    const foundTrail = await this.trailModel.findById(id);

    // TODO: create custom error to return the right status code and message
    if (!foundTrail) {
      throw new Error('Not found');
    }

    return foundTrail.toObject();
  }

  update(id: number, updateTrailDto: UpdateTrailDto) {
    return `This action updates a #${id} trail`;
  }

  remove(id: number) {
    return `This action removes a #${id} trail`;
  }
}
