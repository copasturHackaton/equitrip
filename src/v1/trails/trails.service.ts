import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(
    createTrailDto: CreateTrailDto,
    authorId: string,
  ): Promise<Experience> {
    try {
      const experiencesExist = await this.experienceModel
        .find({
          $or: createTrailDto.getExperiences().map((_id) => ({ _id })),
        })
        .lean()
        .exec();

      if (experiencesExist.length !== createTrailDto.getExperiences().length) {
        throw new NotFoundException('Some location was not found');
      }

      const createdLocation = new this.trailModel({
        ...createTrailDto,
        authorId,
      });
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
    try {
      const trailsQuery = this.trailModel
        .find()
        .populate({
          path: 'experiences',
          populate: {
            path: 'location',
            model: 'Location',
          },
        })
        .skip(offset)
        .limit(limit);

      if (sort) {
        trailsQuery.sort({ updatedAt: sort });
      }

      const trails = await trailsQuery.lean().exec();
      const count = await this.trailModel.countDocuments();

      return {
        count,
        trails,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: string) {
    const foundTrail = await this.trailModel.findById(id).populate({
      path: 'experiences',
      populate: {
        path: 'location',
        model: 'Location',
      },
    });

    if (!foundTrail) {
      throw new NotFoundException('Trail not found');
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
